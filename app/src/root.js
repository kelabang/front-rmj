import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import login from './route/login/login.reducer'
import listfeed from './component/listfeed/listfeed.reducer'
import listfeedProfile from './component/listfeed/listfeedProfile.reducer'
import composefeed from './component/composefeed/composefeed.reducer'
import writereditor from './component/writereditor/writereditor.reducer'
import progressbar from './component/progressbar/progressbar.reducer'

export default combineReducers({
	routing: routerReducer,
	login,
	composefeed,
	listfeed,
	listfeedProfile,
	writereditor,
	progressbar,
})