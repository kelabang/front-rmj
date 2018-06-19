/*
* @Author: Imam
* @Date:   2018-06-17 13:29:40
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-17 13:58:32
*/

import React, {Component} from 'react'
import ComposeFeed from './../../composefeed/composefeed'

function withExtendedComponent (features) {
	return (WrappedComponent) => {
		return class withExtendedComponent extends Component {
			constructor (props) {
				super(props)
			}
			render () {
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

export default withExtendedComponent