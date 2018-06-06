/*
* @Author: d4r
* @Date:   2018-02-20 22:37:11
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-06 02:35:48
*/

import unregister from './ApiFetch'
import Storage from './Storage'
import isdo from './isdo'

import config from './../config'
import axios from 'axios'
const {API_URL} = config

const {isLogin} = isdo
const URL = API_URL
// const URL = 'http://localhost:8080/v2'
// const URL = 'https://api.rumaji.com/v2'
function handleErrors (response) {
	if(!response.ok) {
		console.error(response.statusText)
	}
	return response
}

class Api {
	constructor (url = URL) {
		this._url = url
		this._seekCredential = () => {
			if(!isLogin()) return null 
			return Storage.getSecurely('ac')
		}
		this._serialize = (obj, prefix) => {
			var str = [], p
			for(p in obj) {
				if (obj.hasOwnProperty(p)) {
					var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]
					str.push((v !== null && typeof v === 'object') ? 
						this._serialize(v, k): 
						encodeURIComponent(k) + '=' + encodeURIComponent(v))
				}
			}
			return str.join('&')
		}
	}
	get (endpoint, queryparam = {}) {
		let ac = this._seekCredential()
		const options = {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		}
		if(ac) ac = 'Bearer '+ac 
		if(ac) options.headers['Authorization'] = ac
		let url = this._url + endpoint
		if(queryparam.length > 0) url = url + '?' + this._serialize(queryparam)
		return fetch(url, options)
			.then(handleErrors)
			.then(response => response.json())
	}
	getRaw () {
		return axios.get(this._url)
			.then(handleErrors)
	}
	postFile (endpoint, bodyparam) {
		let url = endpoint
		return axios.post(url, 
			bodyparam,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
		})
	}
	post (endpoint, bodyparam, queryparam = '') {
		let ac = this._seekCredential()
		if(ac) ac = 'Bearer '+ac 
		let url = this._url + endpoint + this._serialize(queryparam)
		let options = {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(bodyparam),
			headers: {
				'content-type':'application/json'
			}
		}
		if(ac) options.headers['Authorization'] = ac
		return fetch(url, options)
			.then(handleErrors)
			.then(response => response.json())
	}
	put (endpoint, bodyparam, queryparam) {
		let url = this._url + endpoint + this._serialize(queryparam)
		let options = {
			method: 'PUT',
			mode: 'cors',
			body: JSON.stringify(bodyparam),
			headers: {
				'content-type':'application/json'
			}
		}
		return fetch(url, options)
			.then(handleErrors)
			.then(response => response.json())
	}
	delete (endpoint, bodyparam, queryparam) {
		let url = this._url + endpoint + this._serialize(queryparam)
		let options = {
			method: 'DELETE',
			mode: 'cors',
			body: JSON.stringify(bodyparam),
			headers: {
				'content-type':'application/json'
			}
		}
		return fetch(url, options)
			.then(handleErrors)
			.then(response => response.json())
	}
}
export default Api
