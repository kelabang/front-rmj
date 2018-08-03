/*
* @Author: d4r
* @Date:   2018-02-23 00:38:24
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 20:44:48
*/
import React, {Component} from 'react'

import Feed from './feedTimeline'

import './listfeed.css'

class ListFeed extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.props.getFeedAsync()
	}
	render () {
		return (
			<div className="feeds">
				{
					this.props.feeds.map(
						feed =>
							<Feed 
								{...feed}
								key={feed.id}
								vkey={feed.key}
							/>
					)
				}
			</div>
		)
	}
}

ListFeed.defaultProps = {
	feeds: [],
	getFeedAsync: () => {}
}


export default ListFeed