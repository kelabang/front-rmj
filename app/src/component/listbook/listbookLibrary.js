/*
* @Author: Imam
* @Date:   2018-06-24 20:59:29
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 21:25:54
*/

import {bindActionCreators, compose} from 'redux'
import {connect} from 'react-redux'

import ListBook from './listbook'

import {
	getBookAsync
} from './listbook.reducer'

const mapStateToProps = ({listbook}) => {
	const {books, is_fetching} = listbook
	return {
		books: books,
		list: books,
		is_fetching: is_fetching,
		isLoading: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getBookAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListBook) 