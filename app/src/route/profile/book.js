/*
* @Author: d4r
* @Date:   2018-03-02 10:53:32
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-27 21:03:54
*/
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './../../component/mainheader/mainheader'
import BoxProfile from './../../component/boxprofile/boxprofile'

import './profile.css'

class Book extends Component {
	render () {
		return (
			<Fragment>
				<MainHeader  />
				<div id='main'>
					<article>
						<BoxProfile />
						<div className="pure-menu pure-menu-horizontal center">
						    <ul className="pure-menu-list">
						        <li className="pure-menu-item"><Link to="profile" className="pure-menu-link">Feeds</Link></li>
						        <li className="pure-menu-item"><Link to="stories" className="pure-menu-link">Stories</Link></li>
						        <li className="pure-menu-item"><Link to="books" className="pure-menu-link nav-active">Books</Link></li>
						    </ul>
						</div>
						<br/>
					</article>
					<nav className=""> </nav>
					<aside className=""> </aside>
				</div>
			</Fragment>
		)
	}
}

export default Book