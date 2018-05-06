/*
* @Author: Imam
* @Date:   2018-04-22 17:24:11
* @Last Modified by:   Imam
* @Last Modified time: 2018-04-22 17:51:01
*/
import React, {Component} from 'react'
const withInfiniteScroll = (Component) =>
	class WithInfiniteScroll extends Component {
		componentDidMount() {
		  window.addEventListener('scroll', this.onScroll, false);
		}

		componentWillUnmount() {
		  window.removeEventListener('scroll', this.onScroll, false);
		}

		onScroll = () => {
			console.log(this.props)
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
		  return <Component {...this.props} />;
		}
	}

export default withInfiniteScroll