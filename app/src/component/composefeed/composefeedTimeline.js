/*
* @Author: Imam
* @Date:   2018-05-09 23:40:37
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-19 11:33:01
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
	postFeedAsync
} from './composefeed.reducer'

import ComposeFeed from './composefeed'

class composeFeedTimeline extends Component {
	constructor (props) {
		super(props)
		this.videoattach = null
	}
	handleSubmit = (currentValue, id) => {
		const {file} = this.refs
		const {
			files:[
				datafile
			]
		} = file
		this.props.postFeedAsync(currentValue, id, datafile)
	}
	render() {
		return (
			<ComposeFeed postFeedAsync={this.handleSubmit}>
				<input 
					id="video" 
					style={{
						display: 'none'
					}} 
					type="file" 
					name="file" 
					ref="file"  
				/>
				<label onClick={(e) => this.refs.file.click()} htmlFor="file-input">
				    <img 
				    	src="https://png.icons8.com/metro/1600/video-file.png" 
				    	style={{
				    		pointerEvents:"none",
				    		maxWidth: '20px',
				    		height: 'auto'
				    	}}/>
				</label>
			</ComposeFeed>
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

export default connect(mapStateToProps, mapDispatchToProps)(composeFeedTimeline)