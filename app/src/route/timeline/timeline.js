/*
* @Author: d4r
* @Date:   2018-02-22 00:57:42
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-10 00:07:52
*/
import React, {Component, Fragment} from 'react'

// import {
// 	loginAsync,
// 	registerAsync
// } from './login.reducer'
// import login from './login.reducer'

import ComposeFeed from './../../component/composefeed/composefeedTimeline'
import ListFeed from './../../component/listfeed/listfeedTimeline'
import MainHeader from './../../component/mainheader/mainheader'

import './timeline.css'

class Timeline extends Component {
	render () {
		return (
			<Fragment>
				<MainHeader />
				<div id='main' className="pure-g">
					<article className="pure-u-1-3">
						<ComposeFeed />
						<ListFeed />
					</article>
					<nav className="pure-u-1-3">
					</nav>
					<aside className="pure-u-1-3">
					</aside>
				</div>
				<footer className="hide">footer</footer>
			</Fragment>
		)
	}
}

export default Timeline
