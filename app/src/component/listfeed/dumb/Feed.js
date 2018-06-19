/*
* @Author: Imam
* @Date:   2018-04-22 20:39:03
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-10 14:08:19
*/

import React, {Component, Fragment} from 'react' 
import moment from 'moment'
import JWPlayer from 'react-jwplayer'

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
	renderCommentBox () {
		return (
			<form className="pure-form pure-g" style={{marginTop:"10px", marginBottom: "5px"}}>
				<div className="pure-u-2-24 reset-item">
					<div className="image">
						<img src="images/defpp.svg"/>
					</div>
				</div>
				<div className="pure-u-22-24">
					<textarea className="pure-u-21-24 pure-input-rounded" type="text" placeholder="have a word to say?" rows="1" style={{"maxHeight": "160px", overflow: "hidden", wordWrap: "break-word", "resize": "horizontal", "height": "32px"}}></textarea>
					<button type="submit" className="pure-u-2-24 compose pure-button pure-button-primary">reply</button>
				</div>
			</form>
		)
	}
	render () {
		const {user, content, id, created, parentid, vkey: key} = this.props
		const {username} = user
		const humancreated = moment.utc(created).local().fromNow()
		const cn = (this.props.parentid)? "item child":"item"
		const playlist = []
		return (
			<Fragment>
				<div key={id} className={cn}>
					<a className="round-image image">
						<img src="images/defpp.svg" alt="" />
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
					// this.state.toggle_comment && this.renderCommentBox()
				}
				
				{
					this.props.comments && this.renderComments()
				}
			</Fragment>
		)
	}
}

export default Feed