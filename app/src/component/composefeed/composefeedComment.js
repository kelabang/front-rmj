/*
* @Author: Imam
* @Date:   2018-05-09 23:40:37
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-11 02:38:21
*/

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
	postFeedCommentAsync
} from './composefeed.reducer'

import ComposeFeed from './composefeed'

const mapStateToProps = ({composefeed}) => {
	const {is_fetching} = composefeed
	return {
		is_fetching: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	postFeedAsync : postFeedCommentAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ComposeFeed)