/*
* @Author: Imam
* @Date:   2018-04-22 20:39:03
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 01:51:57
*/

import React, {Component, Fragment} from 'react' 
import moment from 'moment'
import JWPlayer from 'react-jwplayer'

import withMentionInContent from './../hoc/withMentionInContent'
 
class Feed extends Component {
	constructor (props) {
		super(props)
		this.state = {
			toggle_comment: false
		}

	}
	switchToggleComment = (e) => {
		e.preventDefault()
		this.setState({
			toggle_comment: !this.state.toggle_comment
		})
	}
	renderComments () {

		const {comments} = this.props
		
		let toRender = []

		toRender = comments.map(comment => {
			const {
				user,
				content,
				created,
				id
			} = comment

			return (
				<Feed 
					key={id}
					user={user}
					content={content}
					id={id}
					created={created}
					parentid={this.props.id}
				/>
			)
			
		})

		return toRender.reverse()
		
	}
	render () {
		const {user, id, created, parentid, vkey: key} = this.props
		let {content} = this.props
		content = this.props.renderContent(content)
		const {username} = user
		const humancreated = moment.utc(created).local().fromNow()
		const cn = (this.props.parentid)? "item child":"item"
		const playlist = []
		return (
			<Fragment>
				<div key={id} className={cn}>
					<a className="round-image image">
						<img src="/images/defpp.svg" alt="" />
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
							{key && <JWPlayer
								videoId={key}
							/>}
							{this.props.children}
						</div>
					</div>
				</div>
				{
					this.props.comments && typeof this.props.renderComments == 'function' && this.props.renderComments(this.props)
				}
			</Fragment>
		)
	}
}

Feed.defaultProps = {
	renderContent: (content) => content,
	renderComments: ({id:parentid, comments}) => {
		let toRender = []
		toRender = comments.map(comment => {
			return (
				<Feed
					{...comment} 
					key={comment.id}
					parentid={parentid}
				/>
			)
		})
		return toRender.reverse()
	}
}

export default withMentionInContent(Feed)