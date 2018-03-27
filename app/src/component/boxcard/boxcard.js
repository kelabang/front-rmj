/*
* @Author: d4r
* @Date:   2018-03-02 22:14:03
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-05 22:04:39
*/
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './boxcard.css'

class BoxCard extends Component {
	renderEmpty () {
		return (
			<div className="pure-u-md-1-3 pure-u-sm-1 paper empty" >
				<div>
					<img className="poster" src="images/defbg.svg" />
					<h4>Let's Write Something</h4>
					<Link className="btn" to="write">+ Add Story</Link>
					<div className="space" />
				</div>
			</div>
		)
	}
	render () {
		if(this.props.empty) return this.renderEmpty()
		return (
			<div className="pure-u-md-1-3 pure-u-sm-1 paper">
				<img className="poster" src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/PD0XWZZSX5.jpg" />
				<h5>Author</h5>
				<h4>Title of the story</h4>
				<hr />
				<p>Down on the West Coast where the sand meets the crashing waves and your dreams come true...</p><a className="btn">Read More </a>
				<div className="space" />
			</div>
		)
	}
}

export default BoxCard