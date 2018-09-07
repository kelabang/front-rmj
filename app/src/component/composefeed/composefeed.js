/*
* @Author: d4r
* @Date:   2018-02-23 03:23:11
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-19 11:33:26
*/

import React, {Component, Fragment} from 'react'
import TextareaAutosize from 'react-autosize-textarea'

import {rangeRandom} from './../../util/random'

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
			const {id} = this.props
			this.props.postFeedAsync(currentValue, id)
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
	renderExtraAction () {
		console.log('renderExtraAction ', this.props)
		if(!this.props.children) return null
		return this.props.children
		// return (
		// 	(
		// 		<Fragment>
		// 			<label for="file-input">
		// 			    <img 
		// 			    	src="https://png.icons8.com/metro/1600/video-file.png" 
		// 			    	style={{
		// 			    		pointerEvents:"none",
		// 			    		maxWidth: '20px',
		// 			    		height: 'auto'
		// 			    	}}/>
		// 			</label>
		// 			<input 
		// 				id="video" 
		// 				style={{
		// 					display: 'none'
		// 				}} 
		// 				type="file" 
		// 				name="file" 
		// 				ref="file"  
		// 			/>
		// 		</Fragment>
		// 	)
		// )
	}
	render() {
		const buttonCn = (this.props.yescomment) ? "pure-u-2-24 pure-u-md-2-24 pure-u-lg-1-24 compose pure-button pure-button-primary commenttop" : "pure-u-2-24 pure-u-md-2-24 pure-u-lg-1-24 compose pure-button pure-button-primary lesstop"
		return (
			<div className="compose">
				<form onSubmit={this.handleSubmit} className="pure-form pure-g">
					<div className="image-compose pure-u-2-24 reset-item">
						<div className="image">
							<img src="/images/defpp.svg" />
						</div>
					</div>
					<div className="pure-u-md-22-24 pure-u-1" style={{position: 'relative'}}>
						
							<TextareaAutosize 
								key={this.state.build_key}
								ref="content" 
							className="pure-u-20-24 pure-u-md-20-24 pure-u-lg-20-24 pure-input-rounded" 
								type="text" 
								placeholder="have a word to say?"
								maxRows={10}
								onFocus={this.switchButton.bind(this, true)}
								onBlur={this.switchButton.bind(this, false)}
							/>
							<div style={{
								display: 'none',
								position: 'absolute',
								top: 5,
								right:85
							}}>
								{this.renderExtraAction()}
							</div>
							{
								(
								<button type="submit" className={buttonCn}>tell</button>
								)
							}
					</div>
				 </form>
			</div>
		)
	}
}

ComposeFeed.defaultProps = {
	postFeedAsync: function () {}
}

export default ComposeFeed