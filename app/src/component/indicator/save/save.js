/*
* @Author: d4r
* @Date:   2018-03-17 22:33:06
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-18 03:06:44
*/

import React, {Component, Fragment} from 'react'
// import FlexView from 'react-flexview'
import AsyncStatusIndicator from 'buildo-react-components/lib/AsyncStatusIndicator'
import Icon from 'buildo-react-components/lib/Icon'

const labels = {
	success: 'autosaved',
	error: 'failed autosave',
	ready: '',
	processing: 'autosaving'
}

const icons = {
	success: <Icon icon='check-circle' />,
	error: <Icon icon='x-circle' />,
	processing: <Icon icon='loader spinner' />
}

class Save extends Component {
	constructor (props) {
		super(props)
		this.state = {
			state: 'ready' // ready, error, success, processing
		}
	}
	render () {
		const {state} = this.state
		return (
			<Fragment  height={50}>
				<AsyncStatusIndicator
					style={{opacity: '.5'}}
					state={state}
					icons={icons}
					labels={labels}
				/>
			</Fragment>
		)
	}
}

export default Save