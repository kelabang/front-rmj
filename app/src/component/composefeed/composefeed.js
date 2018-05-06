/*
* @Author: d4r
* @Date:   2018-02-23 03:23:11
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-17 08:40:51
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea'

import {rangeRandom} from './../../util/random'

import {
	postFeedAsync
} from './composefeed.reducer'

import './composefeed.css'

class ComposeFeed extends Component {
	constructor (props) {
		super(props)
		this.state = {
			build_key: 123123,
			show: false
		}
		this.handleSubmit = (e) => {
			e.preventDefault()
			const {content} = this.refs
			const {currentValue} = content
			console.log(this.refs)
			console.log(currentValue)
			this.props.postFeedAsync(currentValue)
			this.refs.content.value = ''
			this.setState({
				build_key: rangeRandom(100, 999)
			})
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
							key={this.state.build_key}
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
								<button type="submit" className="pure-u-2-24 compose pure-button pure-button-primary">tell</button>
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