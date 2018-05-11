/*
* @Author: Imam
* @Date:   2018-05-11 05:26:28
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-11 13:12:54
*/



const dev = {
	'API_URL': 'http://localhost:8080/v2',
	'FACEBOOK_ID' : '399892760060943' 
}

const prod = {
	'API_URL': 'https://api.rumaji.com/v2',
	'FACEBOOK_ID': '182226439207649'
}

const config = process.env.REACT_APP_MODE === 'pro'
  ? prod
  : dev;

export default {
	...config
}