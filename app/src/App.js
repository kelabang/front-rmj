import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom'


import {isdo} from './util/index'
import Login from './route/login/login'
import Register from './route/login/register'
import Book from './route/book/book'
import Timeline from './route/timeline/timeline'
import Profile from './route/profile/profile'
import ProfileStory from './route/profile/story'
import ProfileBook from './route/profile/book'
import Write from './route/story/write'
import Library from './route/library/library'
import Error404 from './route/error/error404'

import Progressbar from './component/progressbar/progressbar'

import './app.css'
import './readable.css'

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
	<Fragment>
		<Switch>
			<Route exact path="/logout" render={() => doLogout()} />
			<Route exact path="/" render={() => {
				return redir(Timeline)
			}}/>
			<Route exact path="/library" render={() => {
				return redir(Library)
			}}/>
			<Route exact path="/register" render={() => {
				return redir(Register, 1) 
			}} />
			<Route path="/book/:bookisbn/:bookslug?" render={() => {
				return redir(Book)
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
		<div id="ffooter"><Progressbar /></div>
	
	</Fragment>
)



export default App