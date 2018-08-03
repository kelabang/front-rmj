/*
* @Author: Imam
* @Date:   2018-07-05 21:24:23
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-05 21:25:10
*/

export default function isEmtpyObject (obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}