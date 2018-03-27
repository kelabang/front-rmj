/*
* @Author: d4r
* @Date:   2018-03-02 10:53:32
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-04 12:41:00
*/
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './../../component/mainheader/mainheader'
import BoxProfile from './../../component/boxprofile/boxprofile'
import ComposeFeed from './../../component/composefeed/composefeed'
import ListFeed from './../../component/listfeed/listfeed'

import './profile.css'

class Profile extends Component {
	render () {
		return (
			<Fragment>
				<MainHeader  />
				<div id='main'>
					<article>
						<BoxProfile />
						<div className="pure-menu pure-menu-horizontal center">
						    <ul className="pure-menu-list">
						        <li className="pure-menu-item"><Link to="profile" className="pure-menu-link nav-active">Feeds</Link></li>
						        <li className="pure-menu-item"><Link to="stories" className="pure-menu-link">Stories</Link></li>
						        <li className="pure-menu-item"><a href="/" className="pure-menu-link disabled not-active" disabled>Books</a></li>
						    </ul>
						</div>
						<br/>
						<ComposeFeed />
						<ListFeed />
					</article>
					<nav className=""> </nav>
					<aside className=""> </aside>
				</div>
			</Fragment>
		)
	}
}

export default Profile