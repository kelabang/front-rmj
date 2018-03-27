/*
* @Author: d4r
* @Date:   2018-02-24 01:24:57
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-24 01:30:49
*/
import Storage from './Storage'
const jwtDecode = require('jwt-decode')

function isLogin () {
	let ac = Storage.getSecurely('ac')
	try {
		jwtDecode(ac) 
		return true
	} catch (e) {
		return false
	}
}

function doLogout () {
	Storage.reset()
	window.location.href='/'
	return true
}

export default {
	isLogin,
	doLogout
}