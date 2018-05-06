/*
* @Author: Imam
* @Date:   2018-04-22 20:52:49
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-22 20:55:15
*/

import {bindActionCreators, compose} from 'redux'
import {connect} from 'react-redux'

import ListFeed from './listfeed'
import withInfiniteScroll from './../hoc/WithInfinite/WithInfinite'

import {
	getFeedAsync,
	getFeedMoreAsync
} from './listfeed.reducer'

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
)(ListFeed)

export default connect(mapStateToProps, mapDispatchToProps)(ListFeedWithInfinite)