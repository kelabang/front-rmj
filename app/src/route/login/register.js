/*
* @Author: d4r
* @Date:   2018-02-20 01:18:39
* @Last Modified by:   Imam
* @Last Modified time: 2018-05-06 15:25:21
*/
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import {
	loginAsync,
	registerAsync,
	loginFacebookAsync
} from './login.reducer'
import './login.css'

class Register extends Component {
	constructor (props) {
		super(props)
		this.state = {
			status_facebook: 0,
			status: 0
		}
		this.loginSubmit = (e) => {
			e.preventDefault()
			const {email, password} = this.refs
			this.props.loginAsync(email.value, password.value)
			// props.loginAsync(email, password)
		}
		this.registerSubmit = (e) => {
			e.preventDefault()
			const {regusername, regemail, regpassword, regreffbid} = this.refs
			
			let type
			if(regreffbid.value) {
				type = 1
			}
			this.props.registerAsync(regusername.value, regemail.value, regpassword.value, {
				ref_id: regreffbid.value,
				ref_type: type
			})
		}
		this.loginFacebook = (e) => {
			console.log('login facebook')
			this.setState({
				status_facebook:1
			})
		}
		this.responseFacebook = (resp) => {
			console.log('response facebook', resp)
			this.props.loginFacebookAsync(resp)
			this.setState({
				status_facebook:0
			})
		}
		this.renderButtonFacebook = () => {
			let output;
			switch (this.state.status_facebook) {
				case 0:
					output = (<FacebookLogin
			                appId="182226439207649"
			                autoLoad={false}
			                fields="name,email,picture"
			                cssClass="pure-button login bgwhite rmj rmj-fb-button"
			                onClick={this.loginFacebook}
			                callback={this.responseFacebook} />)
				break
				case 1:
					output = (
						<button className={"pure-button login bgwhite rmj rmj-fb-button"} disabled> logging in facebook... </button>
					)
				break
			}
			return output
		}
	}
	componentDidMount () {
		if(this.props.form_email) {
			this.refs.regemail.value = this.props.form_email 
			this.refs.regreffbid.value = this.props.form_facebook_id 
		}
	}
	componentDidUpdate (prevProps, prevState) {
		if(prevProps.form_email !== this.props.form_email) {
			this.refs.regemail.value = this.props.form_email 
			this.refs.regreffbid.value = this.props.form_facebook_id 
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
		              {this.renderButtonFacebook()}
		            </form>
		          </div>
		        </div>
		        <div className="splash-container">
		          <div className="splash">
		            <div className="ribbon l-box-lrg pure-g">
		              <div className="">
		                <div className="abs">
		                  <p className="splash-subhead rmj-sub">
		                  	Roses is red, Violets are blue.
		                  </p>
		                </div>
		                <form onSubmit={this.registerSubmit} className="pure-form pure-form-stacked rmj-register">
		                  <fieldset>
		                    <input ref="regreffbid" type="text" placeholder="fbid" style={{display:'none'}} />
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
	console.log('mapStateToProps : ', state)
	const {login} = state
	return {...login}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	loginAsync,
	registerAsync,
	loginFacebookAsync
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)