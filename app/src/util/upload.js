/*
* @Author: Imam
* @Date:   2018-06-03 19:58:36
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-12 23:25:57
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
				if(i == 100000) return next(new Error('its limit request'))
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
	let {
		type,
		size,
		method,
		tags
	} = datafile
	const options = {
		mime:type, size, tags
	}
	// if(!method) method = 's3' // 	change transmit way to upload 
	if(method) options.method = method
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
			let progress_url = null
			if(method != 's3') 
				progress_url = protocol+'://'+address+'/progress'+'?token='+token+'&callback=prog'
			const formdata = new FormData()
			let uploadPromise;
			if(method == 's3') {
				formdata.append('file', datafile)
				uploadPromise = api.putFile(url, formdata, type)
					.catch((error) => {
				        // Error
				        if (error.response) {
				            // The request was made and the server responded with a status code
				            // that falls out of the range of 2xx
				            console.log(error.response.data);
				            console.log(error.response.status);
				            console.log(error.response.headers);
				        } else if (error.request) {
				            // The request was made but no response was received
				            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				            // http.ClientRequest in node.js
				            console.log(error.request);
				        } else {
				            // Something happened in setting up the request that triggered an Error
				            console.log('Error', error.message);
				        }
				        console.log(error.config);
				    });
			} else {
				formdata.append('file', datafile)
				uploadPromise = api.postFile(url, formdata) 
			}
			return {
				uploadPromise,
				progress_url
			}
		})
}