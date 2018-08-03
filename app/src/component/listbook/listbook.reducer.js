/*
* @Author: Imam
* @Date:   2018-06-24 20:48:47
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 21:34:37
*/

import update from 'immutability-helper'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false,
	books: []
}

const [request, failure, success] = [
	'LOAD_BOOK_REQUEST',
	'LOAD_BOOK_FAILURE',
	'LOAD_BOOK_SUCCESS'
].map(createAction)

export function getBookAsync () {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api
			.get('/book')
			.then(payload => {
				const {data} = payload
				dispatch(success({
					books: data,
					loading: false
				}))
			})
	}
}

const reducer = createReducer({
	[request]: (state, payload) => {
		const {loading} = payload
		return update(state, {
			is_fetching: {$set: loading}
		})
	},
	[failure]: (state, payload) => {
		const {loading} = payload
		return update(state, {
			is_fetching: {$set:loading}
		})
	},
	[success]: (state, payload) => {
		const {loading, books} = payload
		if(!books) return state
		const toUpdate = {
			is_fetching: {$set:loading},
			books:{$set: books}
		}
		return update(state, toUpdate)
	}
}, defaultState)

export default reducer