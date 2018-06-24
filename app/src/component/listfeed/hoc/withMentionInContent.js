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
				mentions,
				content
			} = this.props
			content = reactStringReplace(content, /(@\w+)/g, (match, i) => {
				return <a href={`${match.replace('@', '')}`}>{match}</a>
			})
			content = reactStringReplace(content, /(#\w+)/g, (match, i) => {
				return <a href={'channel/'+`${match.replace('#', '')}`}>{match}</a>
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