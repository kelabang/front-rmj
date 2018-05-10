/*
* @Author: d4r
* @Date:   2018-02-23 00:38:24
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-10 11:14:05
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
								key={feed.id}
								user={feed.user}
								content={feed.content}
								id={feed.id}
								created={feed.created}
								comments={feed.comments}
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