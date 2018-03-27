/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-23 22:22:20
*/

import update from 'immutability-helper'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

import {getFeedAsync} from './../listfeed/listfeed.reducer'

const api = new Api()

const defaultState = {
	is_fetching: false
}

const [request, failure, success] = [
	'ADD_FEED_REQUEST',
	'ADD_FEED_FAILURE',
	'ADD_FEED_SUCCESS',	
].map(createAction)

export function postFeedAsync (input) {
	return dispatch => {
		dispatch(request())
		return api.post('/feed', {
			type: 1,
			content: input
		})
		.then(payload => dispatch(getFeedAsync()))
		.then(payload => dispatch(success()))
	}
}

const reducer = createReducer({
	[request]: (state,payload) => {
		return update(state, {
			is_fetching: {$set: true}
		})
	},
	[failure]: (state,payload) => {
		return update(state, {
			is_fetching: {$set: false}
		})
	},
	[success]: (state,payload) => {
		return update(state, {
			is_fetching: {$set:false}
		})
	},
}, defaultState)

export default reducer