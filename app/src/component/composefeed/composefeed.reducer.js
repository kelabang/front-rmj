/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-06 23:04:15
*/

import update from 'immutability-helper'
import { push } from 'react-router-redux'
import {createAction, createReducer} from 'redux-act'
import {Api, Storage, upload} from './../../util'
import create from './../../util/requestManager'
import {getFeedAsync} from './../listfeed/listfeed.reducer'

import * as progressbar_reducer  from './../progressbar/progressbar.reducer'

const {
	request: progressbar_request,
	success: progressbar_success,
	failure: progressbar_failure,
} = progressbar_reducer

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

export function postFeedCommentAsync (input, feedid, datafile) {
	return dispatch => {
		dispatch(request())
		return requestManager(api.post('/feed/'+feedid+'/comment', {
			type: 1,
			content: input,
			feed_id: feedid
		}))
		.then(payload => dispatch(getFeedAsync()))
		.then(payload => dispatch(success()))
	}
}

function dataUploadProgress (url) {
	return (dispatch) => {
		upload.observeUploadProgressVideo(url, (prog) => {
			console.log('this is the progress', prog)
			dispatch(progressbar_request({
				percentage: prog
			}))
		}, (err) => {
			if(err) return dispatch(progressbar_failure())
			dispatch(progressbar_success())
		})
	}
}

function attachVideoToFeed(feedPromise, videoPromise) {
	return (dispatch) => {
		return Promise
			.all([feedPromise, videoPromise])
			.then(([feed, video]) => {
				console.log('feed:: ', feed)
				console.log('video:: ', video)
				
			})
	}
}

function withDataFile (input, feedid, datafile) {
	return (dispatch) => {
		return upload.uploadVideo(datafile)
			.then(({uploadPromise: videoPromise, progress_url}) => {
				console.log('progress_url =-', progress_url)
				dispatch(dataUploadProgress(progress_url))
				const postFeedPromise = api.post('/feed', {
					type: 1,
					content: input
				})
				dispatch(attachVideoToFeed(postFeedPromise, videoPromise))
				return postFeedPromise
			})
			.then(payload => dispatch(getFeedAsync()))
			.then(payload => dispatch(success()))
	}
}

function withoutDataFile (input, feedid) {
	return (dispatch) => {
		return requestManager(api.post('/feed', {
			type: 1,
			content: input
		}))
		.then(payload => dispatch(getFeedAsync()))
		.then(payload => dispatch(success()))
	}
}

export function postFeedAsync (input, feedid, datafile) {
	return dispatch => {
		dispatch(request())
		if (datafile) 
			return withDataFile(input, feedid, datafile)(dispatch)
		return withoutDataFile(input, feedid)(dispatch)
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