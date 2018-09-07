/*
* @Author: d4r
* @Date:   2018-03-02 11:54:32
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-03 20:22:32
*/

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {getProfileAsync} from './boxprofile.reducer'
import './boxprofile.css'

class BoxProfile extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
		this.props.getProfileAsync()
	}
	render () {
		return (
			<div className="container">
		        <header>
		            <div className="bio">
		        		<img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className="bg" />
		                <div className="desc">
		                    <h3>@carlf</h3>
		                    <p>Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.</p>
		                </div>
		            </div>
		            
		            <div className="avatarcontainer">
		                <img src="/images/defpp.svg" alt="avatar" className="avatar" />
		                <div className="hover">
		                        <div className="icon-twitter"></div>
		                </div>
		            </div>
		        </header>

		        <div className="content">
		            <div className="pure-g data">
		            	    <div className="pure-u-1-3">
		            	    	<span>Feeds</span>
		            	    	2,934
		            	    </div>
		            	    <div className="pure-u-1-3">
		            	    	<span>Followers</span>
		            	    	1,119
		            	    </div>
		            	    <div className="pure-u-1-3">
		            	    	<span>Following</span>
		            	    	530
		            	    </div>
		            </div>

		            <div className="follow"> <div className="icon-twitter"></div> Follow</div>
		        </div>

		    </div>
		)
	}
}

const mapStateToProps = (state) => {
	const {profile, is_fetching} = state
	return {
		profile: profile,
		is_fetching: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getProfileAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BoxProfile)