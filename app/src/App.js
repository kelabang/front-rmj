import React, {Fragment} from 'react'
import { Route } from 'react-router-dom'


import {isdo} from './util/index'
import Login from './route/login/login'
import Timeline from './route/timeline/timeline'
import Profile from './route/profile/profile'
import ProfileStory from './route/profile/story'
import ProfileBook from './route/profile/book'
import Write from './route/story/write'

import './app.css'

const {isLogin, doLogout} = isdo

const redirectIsLogin = function (Login) {
	return function redir (Destination) {
		return isLogin()?
			<Destination />:
			<Login />
	}
}

const redir = redirectIsLogin(Login)

const App = () => (
	<Fragment>
		<Route exact path="/logout" render={() => doLogout()} />
		<Route exact path="/" render={() => {
			return redir(Timeline)
		}}/>
		<Route exact path="/profile" render={() => {
			return redir(Profile)
		}} />
		<Route exact path="/stories" render={() => {
			return redir(ProfileStory)
		}} />
		<Route exact path="/books-disabled" render={() => {
			return redir(ProfileBook)
		}} />
		<Route exact path="/write" render={() => {
			return redir(Write)
		}} />
		<div className="space" />
	</Fragment>
)



export default App