/*
* @Author: Imam
* @Date:   2018-06-27 22:23:54
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-05 01:01:48
*/

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './../../component/mainheader/mainheader'
import BoxBook from './../../component/boxbook/boxbook'
import ListFeed from './../../component/listfeed/listfeedBook'

class Book extends Component {
	render () {
		return (
			<Fragment>
				<MainHeader />
				<div id="main">
					<article>
						<BoxBook />
						<ListFeed />
					</article>
					<nav/>
					<aside/>
				</div>
			</Fragment>
		)
	}
}

export default Book