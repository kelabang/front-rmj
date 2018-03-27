/*
* @Author: d4r
* @Date:   2018-02-23 03:23:11
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-12 23:19:54
*/
import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea'

import {
	postFeedAsync
} from './composefeed.reducer'

import './composefeed.css'

class ComposeFeed extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show: false
		}
		this.handleSubmit = (e) => {
			e.preventDefault()
			const {content} = this.refs
			const {value} = content
			this.props.postFeedAsync(value)
			content.value = ''
		}
		this.switchButton = (value, e) => {
			this.setState({
				show: value
			})
		}
	}
	render() {
		return (
			<div className="compose">
				<form onSubmit={this.handleSubmit} className="pure-form pure-g">
					<div className="pure-u-2-24 reset-item">
						<div className="image">
							<img src="images/defpp.svg" />
						</div>
					</div>
					<div className="pure-u-22-24">
						<TextareaAutosize 
							ref="content" 
							className="pure-u-21-24 pure-input-rounded" 
							type="text" 
							placeholder="have a word to say?"
							maxRows={10}
							onFocus={this.switchButton.bind(this, true)}
							onBlur={this.switchButton.bind(this, false)}
						/>
						{
							// this.state.show &&
							(
								<button type="submit" class="pure-u-2-24 compose pure-button pure-button-primary">tell</button>
							)
						}
					</div>
				 </form>
			</div>
		)
	}
}

const mapStateToProps = ({composefeed}) => {
	const {is_fetching} = composefeed
	return {
		is_fetching: is_fetching
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	postFeedAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ComposeFeed)