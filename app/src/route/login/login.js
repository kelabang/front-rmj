/*
* @Author: d4r
* @Date:   2018-02-20 01:18:39
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-23 00:45:48
*/
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
	loginAsync,
	registerAsync
} from './login.reducer'
import './login.css'

class Login extends Component {
	constructor (props) {
		super(props)

		this.loginSubmit = (e) => {
			e.preventDefault()
			const {email, password} = this.refs
			console.log(email.value, password.value)
			this.props.loginAsync(email.value, password.value)
			// props.loginAsync(email, password)
		}
		this.registerSubmit = (e) => {
			e.preventDefault()
			const {regusername, regemail, regpassword} = this.refs
			this.props.registerAsync(regusername.value, regemail.value, regpassword.value)
		}
	}
	render () {
		return (<div>
		        <div className="header">
		          <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
		            <a className="pure-menu-heading" >Rumaji</a>
		            <form onSubmit={this.loginSubmit} className="pure-form rmj-inline">
		              <input ref="email" type="email" placeholder="Email" />
		              <input ref="password" type="password" placeholder="Password" />
		              <button type="submit" className="pure-button login bgwhite rmj">Login</button>
		            </form>
		          </div>
		        </div>
		        <div className="splash-container">
		          <div className="splash">
		            <div className="ribbon l-box-lrg pure-g">
		              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 ">
		                <div className="abs">
		                  <p className="splash-subhead rmj-sub">
		                    Read and Share it. Join today.
		                  </p>
		                </div>
		                <form onSubmit={this.registerSubmit} className="pure-form pure-form-stacked rmj-register">
		                  <fieldset>
		                    <input ref="regusername" type="text" placeholder="Username" />
		                    <input ref="regemail" type="email" placeholder="Email" />
		                    <span className="pure-form-message hide">This is a required field.</span>
		                    <input ref="regpassword" type="password" placeholder="Password" />
		                    <label htmlFor="remember" className="pure-checkbox hide">
		                      <input type="checkbox" /> Remember me
		                    </label>
		                    <button type="submit" className="pure-u-1 pure-button pure-button-primary">Sign Up</button>
		                  </fieldset>
		                </form>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="content-wrapper">
		          <div className="footer l-box is-center">
		            © 2018 Rumaji
		          </div>
		        </div>
		      </div>)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	loginAsync,
	registerAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)