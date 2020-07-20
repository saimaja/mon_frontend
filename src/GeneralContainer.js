import React, { Component } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import MonumentContainer from './components/MonumentContainer'
// import MonumentDetail from './components/MonumentDetail'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Travelogue from './components/Travelogue'
import Home from './components/Home'
import Register from './components/Register'
// import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'


export default class GeneralContainer extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/monuments' render={() =>
                        <MonumentContainer 
                        search={this.props.search}
                        monuments={this.props.monuments}/>
                    } />

                    <Route exact path='/user/:id' render={() =>
                        <UserProfile 
                        currentUser={this.props.currentUser}
                        userName={this.props.userName}
                        admin={this.props.admin}/>
                    } />

                    <Route exact path='/home' render={() =>
                        <Home />
                    } />

                </Switch>
            </Router>

        )
    }
}

