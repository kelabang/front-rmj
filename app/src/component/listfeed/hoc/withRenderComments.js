/*
* @Author: Imam
* @Date:   2018-06-24 01:32:52
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 01:46:15
*/

import React, {Component} from 'react'

const withRenderComments = (WrappedComponent) =>
	class WithRenderComments extends Component {
		renderComments = ({id:parentid, comments}) => {
			let toRender = []
			toRender = comments.map(comment => {
				return (
					<WrappedComponent
						{...comment} 
						key={comment.id}
						parentid={parentid}
					/>
				)
			})
			return toRender.reverse()
		}
		render () {
			return <WrappedComponent 
				{...this.props}
				renderComments={this.renderComments}
			/>
		}
	} 

export default withRenderComments