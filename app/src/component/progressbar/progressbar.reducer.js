/*
* @Author: Imam
* @Date:   2018-06-06 01:21:24
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-06 02:51:12
*/

import update from 'immutability-helper'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false, 
	progress: 0
}

export const [request, failure, success] = [
	'LOAD_PROGRESSUPLOAD_REQUEST',
	'LOAD_PROGRESSUPLOAD_FAILURE',
	'LOAD_PROGRESSUPLOAD_SUCCESS'
].map(createAction)

const reducer = createReducer({
	[request]: (state,payload) => {
		const {percentage} = payload
		return update(state, {
			is_fetching: {$set: true},
			progress: {$set: percentage}
		})
	},
	[failure]: (state,payload) => {
		return update(state, {
			is_fetching: {$set: false},
			progress: {$set: 0}
		})
	},
	[success]: (state,payload) => {
		return update(state, {
			is_fetching: {$set:false},
			progress: {$set: 0}
		})
	},
}, defaultState)

export default reducer