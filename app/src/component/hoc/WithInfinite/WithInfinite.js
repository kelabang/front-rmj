/*
* @Author: Imam
* @Date:   2018-04-22 17:24:11
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-23 21:14:35
*/
import React, {Component} from 'react'
const _throttle = require('lodash.throttle')
const withInfiniteScroll = (Component) =>
	class WithInfiniteScroll extends Component {
		componentDidMount() {
			this.tr = _throttle(this.onScroll, 1500, { 'trailing': true })
			window.addEventListener('scroll', this.tr, false);
		}
		componentWillUnmount() {
			this.tr.cancel()
			window.removeEventListener('scroll', this.tr, false);
		}

		onScroll = () => {
		  if (
		    (window.innerHeight + window.scrollY) 
		    	>= (document.body.offsetHeight - 500) 
		    	&& this.props.list.length
		    	&& !this.props.isLoading
		  ) {
		    this.props.onPaginatedSearch();
		  }
		}

		render() {
			return <Component {...this.props} />
		}
	}

export default withInfiniteScroll