/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-17 08:45:08
*/

import update from 'immutability-helper'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'
import create from './../../util/requestManager'
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

const requestManager = create()
export function postFeedAsync (input) {
	return dispatch => {
		dispatch(request())
		return requestManager(api.post('/feed', {
			type: 1,
			content: input
		}))
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