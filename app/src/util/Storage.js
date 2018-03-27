/*
* @Author: d4r
* @Date:   2018-02-22 01:20:49
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-23 23:58:06
*/
import {Base64} from 'js-base64'
import './localStorage.polyfill'
window.Base64 = Base64
function setSecurely (key, value) {
	const hashValue = Base64.encode(value)
	localStorage.setItem(key, hashValue)
	return true
}
function getSecurely (key) {
	const hashValue = localStorage.getItem(key)
	return Base64.decode(hashValue)
}
function set (key, value) {
	localStorage.setItem(key, value)
	return true
}
function get (key) {
	return localStorage.getItem(key)
}
function setCombine (key, ...args) {
	return localStorage.setItem(key, args.join('|**|'))
}
function getCombine (key) {
	const data = localStorage.getItem(key)
	return (data)? data.split('|**|'): []
}
function reset () {
	localStorage.clear()
	return true
}
export default {
	setSecurely,
	getSecurely,
	set,
	get,
	setCombine,
	getCombine,
	reset
}