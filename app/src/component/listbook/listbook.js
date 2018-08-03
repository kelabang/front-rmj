/*
* @Author: Imam
* @Date:   2018-06-24 20:37:37
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 21:28:38
*/
import React, {Component} from 'react'

import './listbook.css'

class ListBook extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
		this.props.getBookAsync()
	}
	onClickBook = (e) => {
		e.preventDefault()
		console.log('book clicked')
	}
	render() {
		return (
			<div id="photos">
				{
					this.props.books.map(
						book => (
							<img src={book.cover_url} onClick={this.onClickBook} />
						)
					)
				}
			</div>
		)
	}
}

ListBook.defaultProps = {
	books: [],
	getBookAsync: () => {}
}

function getRandomSize(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

export default ListBook