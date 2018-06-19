/*
* @Author: Imam
* @Date:   2018-05-11 05:26:28
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-12 15:20:39
*/



const dev = {
	'API_URL': 'http://localhost:8080/v2',
	'FACEBOOK_ID' : '399892760060943',
	'GOOGLE_CLIENT_ID': '593015233814-avrgqsp99p1ai766giik45c2go0rne45.apps.googleusercontent.com',
	'GOOGLE_CLIENT_SECRET': 'dakNE4yWjtN3HAt5Kndykg2f'
}

const prod = {
	'API_URL': 'https://api.rumaji.com/v2',
	'FACEBOOK_ID': '182226439207649',
	'GOOGLE_CLIENT_ID': '593015233814-avrgqsp99p1ai766giik45c2go0rne45.apps.googleusercontent.com',
	'GOOGLE_CLIENT_SECRET': 'dakNE4yWjtN3HAt5Kndykg2f'
}

const config = process.env.REACT_APP_MODE === 'pro'
  ? prod
  : dev;

export default {
	...config
}