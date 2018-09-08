/*
* @Author: Imam
* @Date:   2018-04-22 20:52:49
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-05 01:15:29
*/

import React, {Component} from 'react'
import {bindActionCreators, compose} from 'redux'
import {connect} from 'react-redux'

import ListFeed from './listfeed'
import withInfiniteScroll from './../hoc/WithInfinite/WithInfinite'

import {
	getFeedAsync,
	getFeedMoreAsync
} from './listfeedBook.reducer'

class ListfeedBook extends Component {
	render() {
		return (
			<div className="pure-g">
				<div className="pure-u-lg-1-3" />
				<div className="pure-u-lg-2-3" >
					<ListFeed 
						{...this.props}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({listfeed}) => {
	const {feeds, is_fetching} = listfeed
	return {
		feeds: feeds,
		list: feeds,
		is_fetching: is_fetching,
		isLoading: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getFeedAsync,
	onPaginatedSearch: getFeedMoreAsync
}, dispatch)

const ListFeedWithInfinite = compose(
	withInfiniteScroll
)(ListfeedBook)

export default connect(mapStateToProps, mapDispatchToProps)(ListFeedWithInfinite)