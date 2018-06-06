/*
* @Author: Imam
* @Date:   2018-06-03 19:58:36
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-06 21:04:30
*/

import async from 'async'
import Api from './Api'

const api = new Api()

export function observeUploadProgressVideo (url, next, cb) {
	const api = new Api(url)
	let i = 0
	function prog (json) {
		const {state, received, size} = json
		if(state == 'error') alert('upload error, check your internet connection and please try again.')
		if(state == 'done' || state == 'error') return false
		const percent = Math.floor((received/size)*100) || 0
		next(percent)
		return true
	}
	async.forever(next => {
		api
			.getRaw('')
			.then(response => {
				console.log('response ', response)
				return response.data
			})
			.then(text => eval(text))
			.then(lanjut => {
				if(i == 500) return next(new Error('its limit request'))
				if(!lanjut) return next(new Error('udah done'))
				i++
				next()
			})
	}, err => {
		console.log('-= error ', err)
		cb(err)
	})
}

export function uploadVideo (datafile) {
	console.log('datafile', datafile)
	const {
		type,
		size
	} = datafile
	const options = {
		mime:type, size
	}
	return api.get('/video/auth', options)
		.then(payload => {
			let {
				data: {
					url_upload: url,
					details: {
						address,
						protocol,
						token
					}
				}
			} = payload
			const progress_url = protocol+'://'+address+'/progress'+'?token='+token+'&callback=prog'
			const formdata = new FormData()
			formdata.append('file', datafile)
			const uploadPromise = api
				.postFile(url, formdata)
			return {
				uploadPromise,
				progress_url
			}
		})
}