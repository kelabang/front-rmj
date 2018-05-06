/*
* @Author: Imam
* @Date:   2018-04-16 21:29:23
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-17 07:09:39
*/

export default function create () {
	let currentRequest
	return promise => {
		if(currentRequest) {
			currentRequest.abort();
		}
		let aborted = false
		const customPromise = promise.then(result => {
			if(aborted) {
				throw new Error('Promise aborted')
			}
			currentRequest = null
			return result
		})
		customPromise.abort = () => {
			aborted = true
		}
		return customPromise
	}
}