/*
* @Author: d4r
* @Date:   2018-02-20 23:02:27
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-05 21:28:06
*/
import Api from './Api'
import Storage from './Storage'
import isdo from './isdo'
import * as upload from './upload'
import isEmptyObject from './isEmptyObject'

function getRandomSize(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

export {getRandomSize}
export {isEmptyObject}
export {Api}
export {Storage}
export {isdo}
export {upload}