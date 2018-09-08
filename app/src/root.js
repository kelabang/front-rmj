import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import login from './route/login/login.reducer'
import listfeed from './component/listfeed/listfeed.reducer'
import listfeedProfile from './component/listfeed/listfeedProfile.reducer'
import listfeedBook from './component/listfeed/listfeedBook.reducer'
import composefeed from './component/composefeed/composefeed.reducer'
import writereditor from './component/writereditor/writereditor.reducer'
import progressbar from './component/progressbar/progressbar.reducer'
import listbook from './component/listbook/listbook.reducer'
import boxbook from './component/boxbook/boxbook.reducer'

export default combineReducers({
	routing: routerReducer,
	login,
	composefeed,
	listfeed,
	listfeedProfile,
	listfeedBook,
	writereditor,
	progressbar,
	listbook,
	boxbook
})