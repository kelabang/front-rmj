/*
* @Author: Imam
* @Date:   2018-04-17 07:27:46
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-17 08:04:57
*/

import store from './../Store'
import fetchIntercept from 'fetch-intercept'
import {logout} from './../route/login/login.reducer'

const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occurred during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the response object
        if (response.status == 401) {
        	// throw Error(response.statusText)
        	// execute logout procedure 
        	// redirect to front website / login form
        	store.dispatch(logout())
        }
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

export default unregister