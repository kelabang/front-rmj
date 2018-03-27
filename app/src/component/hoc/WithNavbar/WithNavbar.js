/*
* @Author: d4r
* @Date:   2018-03-17 11:21:58
* @Last Modified by:   d4r
* @Last Modified time: 2018-03-17 22:20:13
*/

import React, {Component, Fragment} from 'react'
import NavBar from 'buildo-react-components/lib/NavBar'


function WithNavbar (options) {
	return (WrappedComponents) => {
		return class WithNavbar extends Component {
			render() {
				const props = {
					content: {
						left: options.left(),
						right: options.right()
					},
					background: 'white',
				}
				return (
					<Fragment>
						<NavBar {...props} />
						<WrappedComponents />
					</Fragment>
				)
			}
		}	
	}
}

export default WithNavbar