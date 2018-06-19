/*
* @Author: Imam
* @Date:   2018-05-10 09:51:15
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-17 13:30:44
*/

import React, {Component} from 'react'

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