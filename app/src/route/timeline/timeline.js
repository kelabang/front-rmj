/*
* @Author: d4r
* @Date:   2018-02-22 00:57:42
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-12 22:57:22
*/
import React, {Component, Fragment} from 'react'

// import {
// 	loginAsync,
// 	registerAsync
// } from './login.reducer'
// import login from './login.reducer'

import ComposeFeed from './../../component/composefeed/composefeed'
import ListFeed from './../../component/listfeed/listfeed'
import MainHeader from './../../component/mainheader/mainheader'

import './timeline.css'

class Timeline extends Component {
	// constructor (props) {
	// 	super(props)
	// }
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
