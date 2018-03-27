/*
* @Author: d4r
* @Date:   2018-03-05 00:34:12
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-25 01:24:53
*/

import {compose, bindActionCreators} from 'redux'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON, convertToRaw} from 'megadraft'
import EditableLabel from 'react-inline-editing'

import {rangeRandom} from './../../util/random'

import {
	postContentAsync,
	restoreContent
} from './writereditor.reducer'

import './../../../node_modules/megadraft/dist/css/megadraft.css'

let init = {
	title: 'Hello',
	subtitle: 'A subtitle for your page goes here',
	editorState: editorStateFromRaw(null)
}

console.log(':: editorStateFromRaw', init.editorState)

class WriterEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editorState: init.editorState,
			subtitle_key: init.subtitle,
			subtitle: props.subtitle || init.subtitle,
			title_key: init.title,
			title: props.title || init.title
		}
		this.onChange = (editorState) => {
			this.setState(
				{editorState},
				() => {
					// const a = editorStateToJSON(this.state.editorState)
					this._collectData()
				}
			)
		}
		this.customValidateText = (text) => {
			return (text.length > 0 && text.length < 64)
		}
		this._handleFocus = (text) => {
			return text
			//       console.log('Focused with text: ' + text);
			// console.log('handle focus', e)
		}
		this._handleFocusOut = (key, text) => {
			// console.log('Left editor with text: ' + key);
			// console.log('Left editor with text: ' + text);
			let update = {}
			if(text === '') {
				update[key+'_key'] = init[key]+rangeRandom(10,99)
				update[key] = init[key]
			}else{
				update[key] = text
			}
			return this.setState(update, () => {
				this._collectData()
			})
		}
		this._collectData = () => {
			// console.log('::_collectData ', this.state.editorState)
			const title = this.state.title
			const subtitle = this.state.subtitle
			const body = editorStateToJSON(this.state.editorState)
			this.props.postContentAsync(title, subtitle, body)
		}
	}
	componentDidMount () {
		this.props.restoreContent()
			.then(editorState => {
				this.setState({
					editorState: editorStateFromRaw(editorState)
				})
			})
	}
	render () {
		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link"><span /></a>

				<div id="main">
					<div className="header">
						{/*<h1>Page Title</h1>*/}
						<h1>
							{
								<EditableLabel
									key={this.props.title_key}
									inputPlaceHolder={init.title}
									text={this.props.title || init.title}
									labelClassName='label-title'
									inputClassName='title'
									inputWidth='auto'
									inputHeight='30px'
									inputMaxLength={100}
									labelFontWeight='bold'
									inputFontWeight='bold'
									onFocus={this._handleFocus}
									onFocusOut={this._handleFocusOut.bind(this, 'title')}
								/>
							}
						</h1>
						<h2>
							<EditableLabel
								key={this.props.subtitle_key}
								inputPlaceHolder={init.subtitle}
								text={this.props.subtitle || init.subtitle}
								labelClassName='label-subtitle'
								inputClassName='subtitle'
								inputWidth='auto'
								inputHeight='30px'
								inputMaxLength={100}
								labelFontWeight='bold'
								inputFontWeight='bold'
								onFocus={this._handleFocus}
								onFocusOut={this._handleFocusOut.bind(this, 'subtitle')}
							/>
						</h2>
					</div>
					<div className="content">
						<MegadraftEditor
							editorState={this.state.editorState}
							onChange={this.onChange}
							placeholder="Write your story here..."
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({
	writereditor
}) => {
	let {
		id,
		subtitle,
		description,
		title,
		formatted,
		is_fetching
	} = writereditor
	formatted = formatted? formatted: null
	let title_key = title+rangeRandom(10,99)
	let subtitle_key = subtitle+rangeRandom(10,99)
	let after_jsonparse = formatted? JSON.parse(formatted): null 
	let format = formatted? editorStateFromRaw(after_jsonparse) : editorStateFromRaw(null)
	return {
		id,
		subtitle,
		description,
		title,
		formatted: format,
		is_fetching,
		title_key,
		subtitle_key
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	postContentAsync,
	restoreContent,
}, dispatch)

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(WriterEditor)