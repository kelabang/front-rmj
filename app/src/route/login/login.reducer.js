/*
* @Author: d4r
* @Date:   2018-02-21 00:21:08
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-06 15:22:58
*/

// import { createActions, handleActions, combineActions } from 'redux-actions'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import update from 'immutability-helper'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false,
	form_email: '',
	form_facebook_id: '',
	logged_user: null,
}

// const {request, failure, success} = createActions({
// 	LOAD_LOGIN_REQUEST: () => ({status:true}),
// 	LOAD_LOGIN_FAILURE: () => ({status:false}),
// 	LOAD_LOGIN_SUCCESS: () => ({status:false}),
// })

const [request, failure, success, preload_register_form, store_user_logged] = [
	'LOAD_LOGIN_REQUEST',
	'LOAD_LOGIN_FAILURE',
	'LOAD_LOGIN_SUCCESS',
	'PRELOAD_REGISTER_FORM',
	'STORE_USER_LOGGED'
].map(createAction);

export function logout () {
	return dispatch => {
		Storage.reset()
		dispatch(push('/'))
	}
}

export function registerFacebookAsync () {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
	}
}

export function getLoggedProfileAsync () {
	return dispatch => {
		api
			.get('/me')
			.then((payload) => {
				const {data} = payload
				dispatch(store_user_logged(data))
			})
	}
}

export function loginFacebookAsync (response) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		const {
			accessToken,
			userID,
			email
		} = response
		return api.post('/auth/facebook', {
			accessToken,
			userID
		}).then(payload => {
			const {data, code} = payload
			if(code !== 200) {
				dispatch(preload_register_form({
					email: email,
					form_facebook_id: userID
				}))
				dispatch(request({
					loading: false
				}))
				return dispatch(push('/register'))
			}
			const {token} = data
			Storage.setSecurely('ac', token)

			dispatch(getLoggedProfileAsync())
			dispatch(push('/'))
		})
	}
}

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
			dispatch(getLoggedProfileAsync())
			dispatch(push('/'))
		})
	}
}

export function registerAsync (username, email, password, {ref_id, ref_type}) {
	return dispatch => {
		dispatch(request({
			loading: true
		}))
		let toSend =  {
			username,
			email,
			password
		}
		console.log('ref_type', ref_type)
		console.log('ref_id', ref_id)
		if(ref_type) {
			toSend = Object.assign({}, toSend, {
				ref_type,
				ref_id
			})
		}
		return api.post('/user/registration', toSend).then(payload => {
			dispatch(loginAsync(username, password))
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
	},
	[preload_register_form]: (state, payload) => {
		
		const {
			email, 
			form_facebook_id
		} = payload

		return {
			...state,
			form_email: email,
			form_facebook_id: form_facebook_id
		}
	},
	[store_user_logged]: (state, payload) => {
		console.log('logged reducer', payload)
		console.log('logged reducer state', state)
		let {
			id,
			created,
			deleted,
			email,
			username,
			firstname,
			lastname,
			status
		} = payload

		let user = {
			id,
			created,
			deleted,
			email,
			username,
			firstname,
			lastname,
			status
		}
		const toUpdate = {
			logged_user: {$set: user}
		}

		return update(state, toUpdate)

	}
}, defaultState)

export default reducer