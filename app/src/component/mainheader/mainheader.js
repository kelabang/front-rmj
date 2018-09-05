/*
* @Author: d4r
* @Date:   2018-02-24 21:49:27
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-03 22:33:36
*/
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Popup from "reactjs-popup"

import { Link, NavLink } from 'react-router-dom'

import './mainheader.css'

class MainHeader extends Component {
	render () {
		const {user} = this.props
		let username = ''
		if(user) username = user.username
		return (
			<header>
				<div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed bgrumaji">
				    <Link className="pure-menu-heading white" to="/">Rumaji</Link>
				    <ul className="pure-menu-list">
				        <li className="pure-menu-item pure-menu-selected hide"><a href="#" className="pure-menu-link">Home</a></li>
				        <li className="pure-menu-item hide"><a href="#" className="pure-menu-link white">Stories</a></li>
				        <li className="pure-menu-item hide"><a href="#" className="pure-menu-link white">Books</a></li>
				    </ul>
				    <ul className="pure-menu-list pull-right">
				        <li className="pure-menu-item ">
        	                    
        	                    <Popup 
	        	                    trigger={
	        	                    	<a className="round-image">
	        	                    		<img src="images/defpp.svg" alt="" />
	        	                    	</a>
	        	                    }
	        	                    position='bottom right'
        	                    	closeOnDocumentClick
        	                    >
        	                        <ul className="pure-menu-list block center">
        	                        	<li className="pure-menu-item head-list bold">
        	                        		{username}
        	                        	</li>
        	                            <li className="pure-menu-item head-list">
        	                            	<NavLink 
        	                            		exact
        	                            		className="pure-menu-link black" 
        	                            		to="profile" 
        	                            		activeClassName="bgblue"
        	                            	>Profile</NavLink>
        	                            </li>
        	                            <li className="pure-menu-item head-list">
        	                            	<NavLink 
        	                            		exact
        	                            		className="pure-menu-link black" 
        	                            		to="logout" 
        	                            		activeClassName="bgblue"
        	                            	>Logout</NavLink>
        	                            </li>
        	                        </ul>
        	                     </Popup>
				        	
				        </li>
				    </ul>
				</div>
			</header>
		)
	}
}

MainHeader.defaultProps = {
	user: null
}

const mapStateToProps = state => {
	const {
		login: {
			logged_user: user
		}
	} = state
	return {
		user
	}
}

export default connect(mapStateToProps)(MainHeader)