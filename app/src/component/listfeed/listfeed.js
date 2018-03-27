/*
* @Author: d4r
* @Date:   2018-02-23 00:38:24
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-04 16:45:39
*/
import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import moment from 'moment'

import {
	getFeedAsync
} from './listfeed.reducer'

import './listfeed.css'

class ListFeed extends Component {
	constructor (props) {
		super(props)
		this.renderFeed = ({user, content, id, created, updated}) => {
			const {username} = user
			const humancreated = moment.utc(created).local().fromNow()
			return (
				<div key={id} className="item">
				  <a className="round-image image">
				      <img src="images/defpp.svg" alt="" />
				  </a>
				  <div className="details">
				    <div>
				      <span>
				      <b>{username}</b>
				      </span>
				      <span className="date">
				      {/*Dec 9, 2018*/}
				      {humancreated}
				      </span>
				      <p>
				      	{content}
				      </p>
				    </div>
				  </div>
				</div>
			)
		}
	}
	componentDidMount () {
		this.props.getFeedAsync()
	}
	render () {
		return (
			<div className="feeds">
				{this.props.feeds.map(feed => this.renderFeed(feed))}
			</div>
		)
	}
}

const mapStateToProps = ({listfeed}) => {
	const {feeds, is_fetching} = listfeed
	return {
		feeds: feeds.reverse(),
		is_fetching: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getFeedAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListFeed)