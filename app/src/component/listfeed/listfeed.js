/*
* @Author: d4r
* @Date:   2018-02-23 00:38:24
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-22 20:56:54
*/
import React, {Component} from 'react'

import Feed from './dumb/Feed'

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