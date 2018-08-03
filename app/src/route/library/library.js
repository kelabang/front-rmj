/*
* @Author: d4r
* @Date:   2018-02-22 00:57:42
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 21:38:17
*/
import React, {Component, Fragment} from 'react'

import MainHeader from './../../component/mainheader/mainheader'
import ListBook from './../../component/listbook/listbookLibrary'

import './library.css'

class Library extends Component {
	render () {
		return (
			<Fragment>
				<MainHeader />
				<div id='main' className="pure-g">
					<article className="pure-u-1-3" >
						<div className="control hide">
							<ul>
								<li>
									add
								</li>
								<li>
									remove
								</li>
							</ul>
						</div>
						<ListBook />
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

export default Library
