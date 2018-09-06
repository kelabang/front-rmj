/*
* @Author: Imam
* @Date:   2018-06-23 21:01:02
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 14:17:32
*/

import React, {Component} from 'react'
const reactStringReplace = require('react-string-replace')

const withMentionInContent = (WrappedComponent) => 
	class WithMentionInContent extends Component {
		renderContent = () => {
			let {
				books,
				mentions,
				content
			} = this.props
			content = reactStringReplace(content, /(@\w+)/g, (match, i) => {
				if(!mentions) mentions = []
				let is_user = mentions.findIndex(item => ('@'+item.username) == match)
				if(is_user > -1)  
					return <a href={`/${match.replace('@', '')}`}>{match}</a>
				if (!books) books = []
				let is_book = books.findIndex(item => (('@'+item.isbn) == match) || (('@'+item.isbn13) == match))
				if(is_book > -1)
					return <a href={`/book/${match.replace('@', '')}`}>{books[is_book].title}</a>
				return match
			})
			content = reactStringReplace(content, /(#\w+)/g, (match, i) => {
				return <a href={'/channel/'+`${match.replace('#', '')}`}>{match}</a>
			})
			return content
		}
		render() {
			return <WrappedComponent 
				{...this.props}				
				renderContent={this.renderContent} 
			/>
		}
	}


export default withMentionInContent