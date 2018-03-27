/*
* @Author: d4r
* @Date:   2018-03-05 00:34:12
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-22 08:37:01
*/

import {compose} from 'redux'
import React, {Component} from 'react'
import FlexView from 'react-flexview'

import withSidebar from './../../component/hoc/WithSidebar/WithSidebar'
import withNavbar from './../../component/hoc/WithNavbar/WithNavbar'
import WriterEditor from './../../component/writereditor/writereditor'

import Save from './../../component/indicator/save/save'

import './../../../node_modules/megadraft/dist/css/megadraft.css'
import './story.css'
import './side-menu.css'

class Write extends Component {
	render () {
		return (
			<WriterEditor />
		)
	}
}

const sidebarComp = () => {
	return (
		<div>
			<div className="pure-menu">
				<a className="pure-menu-heading" href="/">Rumaji</a>
				<ul className="pure-menu-list">
					<li className="pure-menu-item"><a href="#" className="pure-menu-link">draft 1</a></li>
					<li className="pure-menu-item"><a href="#" className="pure-menu-link">draft 2</a></li>
					<li className="pure-menu-item menu-item-divided pure-menu-selected"><a href="#" className="pure-menu-link">draft 3</a></li>
					<li className="pure-menu-item"><a href="#" className="pure-menu-link">draft 4</a></li>
				</ul>
			</div>
		</div>
	)

}

const headerComp = {
	right () { 
		return <FlexView >
			<Save />
		</FlexView>
	},
	left () {
		return <span />
	}
}

export default compose(
	withSidebar(sidebarComp()),
	withNavbar(headerComp)
)(Write)