/*
* @Author: d4r
* @Date:   2018-02-21 00:21:08
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-23 02:57:22
*/

// import { createActions, handleActions, combineActions } from 'redux-actions'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false
}

// const {request, failure, success} = createActions({
// 	LOAD_LOGIN_REQUEST: () => ({status:true}),
// 	LOAD_LOGIN_FAILURE: () => ({status:false}),
// 	LOAD_LOGIN_SUCCESS: () => ({status:false}),
// })

const [request, failure, success] = [
	'LOAD_LOGIN_REQUEST',
	'LOAD_LOGIN_FAILURE',
	'LOAD_LOGIN_SUCCESS',
].map(createAction);

export function loginAsync (username, password) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api.post('/auth/login', {
			password,
			user:username,
			grant_type: 'password',
			client_id: '1'
		}).then(payload => {
			const {data} = payload
			const {token} = data
			Storage.setSecurely('ac', token)
			dispatch(push('/'))
		})
	}
}

export function registerAsync (username, email, password) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		return api.post('/user/registration', {
			username,
			email,
			password,
		}).then((payload) => {
			console.log(payload)
		})
	}
}

const reducer = createReducer({
	[request]: (state, payload) => {
		const {loading} = payload
		return {
			...state,
			is_fetching: loading
		}
	},
	[failure]: (state, {payload: {loading}}) => {
		return {
			...state,
			is_fetching: loading
		}
	},
	[success]: (state, {payload: {loading}}) => {
		return {
			...state,
			is_fetching: loading
		}
	}
}, defaultState)

export default reducer