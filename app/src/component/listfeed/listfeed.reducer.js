/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-23 21:34:37
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
	'LOAD_FEED_REQUEST',
	'LOAD_FEED_FAILURE',
	'LOAD_FEED_SUCCESS',	
].map(createAction)

export function getFeedAsync () {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api.get('/feed')
			.then(payload => {
				const {data} = payload
				dispatch(success({
					feeds: data,
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
		const {loading, feeds} = payload
		return update(state, {
			feeds: {$set:feeds},
			is_fetching: {$set:loading}
		})
	},
}, defaultState)

export default reducer