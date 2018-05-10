/*
* @Author: Imam
* @Date:   2018-05-10 09:51:15
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-11 02:28:39
*/

import React, {Component} from 'react'
import ComposeFeed from './../../composefeed/composefeed'

function withTimelineAction (features) {
	return WrappedComponent => {
		return class withTimelineAction extends Component {
			constructor (props) {
				super(props)
			}
			render() {
				return (
					<WrappedComponent
						{...this.props}
					>
						<p className ="action">
							{features.map(feature => feature({...this.props}))}
						</p>
					</WrappedComponent>
				)
			}
		}
	}
}

export default withTimelineAction