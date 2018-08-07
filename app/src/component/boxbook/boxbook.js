/*
* @Author: Imam
* @Date:   2018-06-27 22:33:52
* @Last Modified by:   Imam
* @Last Modified time: 2018-07-28 22:39:33
*/

import React, {Component,Fragment} from 'react'
import {withRouter} from 'react-router'

import {bindActionCreators, compose} from 'redux'
import {connect} from 'react-redux'
import ListFeed from './../../component/listfeed/listfeedTimeline'

import {getBookSingleAsyncByISBN} from './boxbook.reducer'

import './boxbook.css'

class BoxBook extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.props.getBookSingleAsync(this.props.bookisbn)
	}
	render () {
		return (
				<div className="boxbook container">
					<div className="pure-g">
						<div className="pure-u-lg-1-3" >
							<div className="center image">
								{this.props.cover_url && <img src={this.props.cover_url}/>}
							</div>
						</div>
						<div className="pure-u-lg-2-3 center-padding" >
							<h4 className="read topless">
								{this.props.title}
							</h4>
							<h5>
								{this.props.publisher}-
								{this.props.author}-
								{this.props.isbn}
							</h5>
							<p className="read">
								{this.props.description}
							</p>
						</div>
					</div>
				</div>
		)
	}
}

BoxBook.defaultProps = {
	getBookSingleAsync : () => {},
	id: 0,
	slug: 'a-storm-of-swords',
	title: '',
	description: 'HBO\'s hit series A GAME OF THRONES is based on George R R Martin\'s internationally bestselling series A SONG OF ICE AND FIRE, the greatest fantasy epic of the modern age.',
	publisher: 'HarperCollins Publishers',
	author: 'George R.R. Martin',
	isbn: '000823809X',
	cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51sOF18SI%2BL._SL200_.jpg'
}

const mapStateToProps = (state, ownProps) => {
	const {
		boxbook: {books, is_fetching, id},
	} = state
	const {
		match: {
			params: {
				bookisbn,
				bookslug
			}
		}
	} = ownProps
	const book = (id > 0)? books[id]: null
	if(!book) return {
		book,
		bookisbn,
		bookslug,
		is_fetching
	}
	const {
		title,
		subtitle: description,
		publisher: {
			name: publisher_name
		},
		author: {
			name: author_name
		},
		cover_url,
		isbn
	} = book
	return {
		id,
		title,
		description,
		publisher: publisher_name,
		author: author_name,
		cover_url,
		is_fetching,
		isbn: bookisbn,
		slug: bookslug
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getBookSingleAsync: getBookSingleAsyncByISBN
}, dispatch)

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(BoxBook)