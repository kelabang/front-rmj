/*
* @Author: Imam
* @Date:   2018-05-10 11:05:49
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-11 02:34:55
*/

import React, {Fragment} from 'react'
import Toggle from 'react-toggled'
import Feed from './dumb/Feed'
import withTimelineAction from './hoc/withTimelineAction'

import ComposeFeed from './../composefeed/composefeedComment'

let commentFeature = (props) => {
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
							on && <ComposeFeed id={props.id} />
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

export default withTimelineAction(features)(Feed)