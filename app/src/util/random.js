/*
* @Author: d4r
* @Date:   2018-03-14 22:05:45
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-14 22:16:30
*/

const rangeRandom = (min, max) => {
	return Math.floor(Math.random() * max) + min  
}

export {
	rangeRandom
}