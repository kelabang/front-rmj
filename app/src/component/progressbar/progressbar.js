/*
* @Author: Imam
* @Date:   2018-06-06 00:56:03
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-06 01:44:53
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './progressbar.css'

class Progressbar extends Component {
	render () {
		const {
			percentage,
			is_fetching
		} = this.props
		if(!is_fetching) return (null)
		return (
			<div className="meter orange">
			  <span style={{"width": percentage+"%"}}></span>
			</div>
		)
	}
}

Progressbar.defaultProps = {
	percentage: 0,
	is_fetching: false
}

const mapStateToProps = ({progressbar}) => {
	const {is_fetching, progress: percentage} = progressbar
	return {
		is_fetching,
		percentage
	}
}

export default connect(mapStateToProps)(Progressbar)