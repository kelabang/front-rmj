/*
* @Author: Imam
* @Date:   2018-04-22 20:39:03
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-22 20:45:51
*/

import React, {Component} from 'react' 
import moment from 'moment'

class Feed extends Component {
	render () {
		const {user, content, id, created} = this.props
		const {username} = user
		const humancreated = moment.utc(created).local().fromNow()
		return (
			<div key={id} className="item">
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
					</div>
				</div>
			</div>
		)
	}
}

export default Feed