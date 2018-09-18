/*
* @Author: Imam
* @Date:   2018-07-05 01:18:06
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-05 23:23:30
*/

import update from 'immutability-helper'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage, isEmptyObject} from './../../util'

const api = new Api()

const defaultState = {
	id: 0,
	is_fetching: false, 
	books: {} 
}

const [request, failure, success] = [
	'LOAD_SINGLEBOOK_REQUEST',
	'LOAD_SINGLEBOOK_FAILURE',
	'LOAD_SINGLEBOOK_SUCCESS',
].map(createAction)

export function getBookSingleAsyncBySlug (slug) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api
			.get('/book?slug='+slug)
			.then(payload => {
				if(isEmptyObject(payload)) return null
				let {data: _data} = payload
				let [
					data
				] = _data
				let {
					id
				} = data
				dispatch(success({
					book: data,
					loading: false,
					id: id
				}))
			})
	}
}

export function getBookSingleAsyncById (id) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api
			.get('/book?id='+id)
			.then(payload => {
				if(isEmptyObject(payload)) return null
				let {data: _data} = payload
				let [
					data
				] = _data
				let {
					id
				} = data
				dispatch(success({
					book: data,
					loading: false,
					id: id
				}))
			})
	}
}

export function getBookSingleAsyncByISBN (ISBN) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api
			.get('/book?isbn='+ISBN)
			.then(payload => {
				if(isEmptyObject(payload)) return null
				let {data: _data} = payload
				if(_data.length < 1) return null
				let [
					data
				] = _data
				let {
					id
				} = data
				dispatch(success({
					book: data,
					loading: false,
					id: id
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
			is_fetching: {$set: loading}
		})
	},
	[success]: (state, payload) => {
		const {loading, book, id} = payload
		if(!book) return state
		const toUpdate = {
			is_fetching: {$set: loading},
			books: {
				[book.id]: {$set: book}
			},
			id: {$set: id}
		}
		return update(state,toUpdate)
	}
}, defaultState)

export default reducer