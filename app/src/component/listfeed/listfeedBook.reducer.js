/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-09 01:33:08
*/

import update from 'immutability-helper'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false,
	feeds: []
}

const [request, failure, success] = [
	'LOAD_BOOKFEED_REQUEST',
	'LOAD_BOOKFEED_FAILURE',
	'LOAD_BOOKFEED_SUCCESS',
].map(createAction)

function _cleanPathIsbn (path = '') {
	return path.replace('/book/', '')
}

export function getFeedAsync (isbn) {
	return (dispatch, getState) => {
		dispatch(request({
			loading: true
		}))
		const {
			routing: {
				location: {
					pathname
				}
			}
		} = getState()
		const isbn = _cleanPathIsbn(pathname)
		console.log(isbn)

		return api
			.get('/book/' +  isbn +'/feed')
			.then(payload => {
				const {data} = payload
				let _feeds = []
				if(data) {
					let {feeds} = data.pop()
					_feeds = feeds
				}
				dispatch(success({
					feeds: _feeds,
					loading: false
				}))
			})
	}
}

export function getFeedMoreAsync (isbn) {
	return (dispatch, getState) => {

		// get last feed id
		const {listfeedBook: {feeds}} = getState()
		const last = feeds[feeds.length-1]

		dispatch(request({
			loading: true
		}))

		const {
			routing: {
				location: {
					pathname
				}
			}
		} = getState()
		const isbn = _cleanPathIsbn(pathname)
		console.log(isbn)

		return api
			.get('/book/'+isbn+'/feed?id='+last.id+'&mode=prev')
			.then(payload => {
				
				const { data } = payload
				let _feeds = []
				if (data) {
					let { feeds } = data.pop()
					_feeds = feeds
				}

				const {listfeedBook:{feeds}} = getState()
				const keys = feeds.map(i => i['id'])
				dispatch(success({
					feeds: _feeds.filter(item => keys.indexOf(item.id) < 0),
					custom: 'add',
					loading: false
				}))
			})
	}
}

const reducer = createReducer({
	[request]: (state,payload) => {
		const {loading} = payload
		return update(state, {
			is_fetching: {$set: loading}
		})
		
	},
	[failure]: (state,payload) => {
		const {loading} = payload
		return update(state, {
			is_fetching: {$set: loading}
		})
	},
	[success]: (state,payload) => {
		const {loading, feeds, custom} = payload
		if(!feeds) return state
		const toUpdate = {
			is_fetching: {$set:loading},
			feeds: {$set:feeds}
		}
		switch (custom) {
		case 'add':
			toUpdate['feeds'] = {$push:feeds}
			break
		}
		return update(state, toUpdate)
	},
}, defaultState)

export default reducer