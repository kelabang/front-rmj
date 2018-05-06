import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom'


import {isdo} from './util/index'
import Login from './route/login/login'
import Register from './route/login/register'
import Timeline from './route/timeline/timeline'
import Profile from './route/profile/profile'
import ProfileStory from './route/profile/story'
import ProfileBook from './route/profile/book'
import Write from './route/story/write'
import Error404 from './route/error/error404'

import './app.css'

const {isLogin, doLogout} = isdo

const redirectIsLogin = function (Login) {
	return function redir (Destination, options) {
		if(options == 1) {
			return isLogin()?
				<Timeline />:
				<Destination />
		}
		return isLogin()?
			<Destination />:
			<Login />
	}
}

const redir = redirectIsLogin(Login)

const App = () => (
	<Switch>
		<Route exact path="/logout" render={() => doLogout()} />
		<Route exact path="/" render={() => {
			return redir(Timeline)
		}}/>
		<Route exact path="/register" render={() => {
			return redir(Register, 1) 
		}} />
		<Route exact path="/profile-disabled" render={() => {
			return redir(Profile)
		}} />
		<Route exact path="/stories-disabled" render={() => {
			return redir(ProfileStory)
		}} />
		<Route exact path="/books-disabled" render={() => {
			return redir(ProfileBook)
		}} />
		<Route exact path="/write" render={() => {
			return redir(Write)
		}} />
		<Route component={Error404} />
		<div className="space" />
	</Switch>
)



export default App