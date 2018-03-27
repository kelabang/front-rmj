/*
* @Author: d4r
* @Date:   2018-03-14 23:15:05
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-17 22:23:10
*/

import React, {Component} from 'react'
import Sidebar from 'react-sidebar'

function WithSidebar (SidebarComponent, positionRight=false) {
	return WrappedComponent => {
		return class WithSidebar extends Component {
			constructor (props) {
				super(props)
				this.state = {
					sidebarOpen: false
				}
				this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
			}
			onSetSidebarOpen (open) {
				this.setState({sidebarOpen: open})
			}
			render () {
				let style = {}
				if(positionRight) style['float'] = 'right'
				return (
					<Sidebar 
						sidebar={SidebarComponent}
						docked={this.state.sidebarOpen}
						pullRight={positionRight}
					// onSetOpen={this.onSetSidebarOpen}
					>
						<a 
							href="#"
							style={style}
							onClick={this.onSetSidebarOpen.bind(this, !this.state.sidebarOpen)}>
							Rumaji
						</a>
						<WrappedComponent 
							{...this.props}
						/>
					</Sidebar>
				)
			}
		}
	}
}

export default WithSidebar