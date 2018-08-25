/*
* @Author: Imam
* @Date:   2018-05-10 11:05:49
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-24 01:54:16
*/

import {compose} from 'redux'
import React, {Fragment} from 'react'
import Toggle from 'react-toggled'
import Feed from './dumb/Feed'
import withTimelineAction from './hoc/withTimelineAction'
import withRenderComments from './hoc/withRenderComments'

import ComposeFeed from './../composefeed/composefeedComment'

let commentFeature = (props) => {
	if(props.parentid) return null
	return (
		<Toggle>
			{
				({on, getTogglerProps, setOn, setOff, toggle}) =>
					<Fragment>
						<a href="#" 
							onClick={(e) => {
								e.preventDefault()
								e.persist()
								toggle(e)
							}}
						>
							comment
						</a>
						{
							on && <ComposeFeed yescomment id={props.id} />
						}
					</Fragment>
			}
		</Toggle>
	)
}

let likeFeature = (
	<Fragment>
		<a href="#" onClick={e => e.preventDefault()}>
			like
		</a>
	</Fragment>
)

let features = [
	// likeFeature,
	commentFeature
]

export default compose(
	withRenderComments,
	withTimelineAction(features)
)(Feed)