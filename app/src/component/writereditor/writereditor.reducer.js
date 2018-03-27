/*
* @Author: d4r
* @Date:   2018-03-22 07:03:44
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-25 00:59:34
*/

import update from 'immutability-helper'
import {createAction, createReducer} from 'redux-act'
import {
	// Api, 
	Storage
} from './../../util'

// const api = new Api()

const defaultState = {
	id: '',
	subtitle: '',
	description: '',
	title: '',
	formatted: '',
	is_fetching: false
}

const [request, failure, success, restore] = [
	'SEND_CONTENT_REQUEST',
	'SEND_CONTENT_FAILURE',
	'SEND_CONTENT_SUCCESS',
	'RESTORE_CONTENT'
].map(createAction)

export function restoreContent (id) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))

		let [
			title, subtitle, description, formatted, content
		] = Storage.getCombine('localstory')

		dispatch(restore({
			id:'', title, subtitle, description, formatted, content
		}))

		dispatch(success({
			loading: true
		}))
		
		return Promise.resolve(JSON.parse(formatted))
	}
}

export function postContentAsync (title, subtitle, formatted) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))

		const description = '',
			content = ''

		// const toSend = {
		// 	title,
		// 	subtitle,
		// 	description,
		// 	formatted,
		// 	content,
		// }

		Storage.setCombine('localstory', title, subtitle, description, formatted, content)
		// return api.post('/story', toSend)
		// 	.then(() => {
		// 		dispatch(success({
		// 			loading:false
		// 		}))
		// 	})
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
		const {loading} = payload
		return update(state, {
			is_fetching: {$set:loading}
		})
	},
	[restore]: (state, payload) => {
		const {
			id,
			subtitle,
			description,
			title,
			formatted,
		} = payload
		const toUpdate = {
			id: {$set: id},
			subtitle: {$set: subtitle},
			description: {$set: description},
			title: {$set: title},
			formatted: {$set: formatted}
		}
		return update(state, toUpdate)
	},
}, defaultState)

export default reducer