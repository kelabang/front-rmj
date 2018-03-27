import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import login from './route/login/login.reducer'
import listfeed from './component/listfeed/listfeed.reducer'
import composefeed from './component/composefeed/composefeed.reducer'
import writereditor from './component/writereditor/writereditor.reducer'

export default combineReducers({
	routing: routerReducer,
	login,
	composefeed,
	listfeed,
	writereditor,
})