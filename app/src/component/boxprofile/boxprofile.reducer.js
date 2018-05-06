/*
* @Author: Imam
* @Date:   2018-04-23 23:06:49
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-23 23:58:10
*/

import update from 'immutability-helper'
import {push} from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage} from './../../util'

const api = new Api()

const defaultState = {
	is_fetching: false,
	profile: []
}

const [request, failure, success] = [
	'LOAD_PROFILE_REQUEST',
	'LOAD_PROFILE_FAILURE',
	'LOAD_PROFILE_SUCCESS'
].map(createAction)

export function getProfileAsync() {
	return dispatch => {
		dispatch(request({
			loading:true
		}))

		const username = 'ma4m'

		return api
			.get('/profile/'+username)
			.then(payload => {
				console.log('payload ', payload)
			})
	}
}