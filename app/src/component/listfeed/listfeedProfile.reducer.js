/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-23 01:47:29
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
	'LOAD_FEEDPROFILE_REQUEST',
	'LOAD_FEEDPROFILE_FAILURE',
	'LOAD_FEEDPROFILE_SUCCESS',
].map(createAction)

export function getFeedAsync () {
	return dispatch => {
		dispatch(request({
			loading: true
		}))

		const username = 'ma4m'

		return api
			.get('/ma4m/feed')
			.then(payload => {
				const {data} = payload
				dispatch(success({
					feeds: data,
					loading: false
				}))
			})
	}
}

export function getFeedMoreAsync () {
	return (dispatch, getState) => {

		// get last feed id
		const {listfeedProfile} = getState()
		const {feeds} = listfeedProfile
		const last = feeds[feeds.length-1]
		const username = 'ma4m'

		dispatch(request({
			loading: true
		}))
		return api
			.get('/'+username+'/feed?id='+last.id+'&mode=prev')
			.then(payload => {
				const {data} = payload
				dispatch(success({
					feeds:data,
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