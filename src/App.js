import React, { Component } from 'react'
import './App.css'
import MonumentContainer from './components/MonumentContainer'
// import MonumentDetail from './components/MonumentDetail'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Travelogue from './components/Travelogue'
import Map from './components/Map'
import About from './components/About'
import Register from './components/Register'
// import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'



export default class App extends Component {

  state = {
    monuments: [],
    filterRemoved: [],
    filterRenamed: [],
    filteredYear: [],
    searchField: '',
    currentUser: null,
    admin: false,
    name: '',
    userName: null,
  }

  componentDidMount() {
    if (localStorage.getItem('id') && localStorage.getItem('admin')) {
      this.setState({ currentUser: parseInt(localStorage.getItem('id')), admin: localStorage.getItem('admin') === 'true' ? true : false, userName: localStorage.getItem('username'), name: localStorage.getItem('name') })
      this.fetchMonuments()
    }
  }

  fetchMonuments = () => {
    fetch('http://localhost:3000/monuments')
      .then(resp => resp.json())
      .then(monuments => {
        this.setState({ monuments: monuments })
      }
    )
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  removedMon = (e) => {
    console.log('removing')
    // this.setState({filterRemoved: e.target.value})
  }

  filtered = () => {
    let filtered
    if (this.state.filterRemoved.length === 0) {
      filtered = this.state.monuments
    } else {
      filtered = this.state.monuments.filter(mon => this.state.filterRemoved.includes(mon.name))
    }
    if (this.state.filterRenamed.length > 0) {
      filtered = filtered.filter(mon => this.state.filterRenamed.includes(mon.name.includes('renamed').toLowerCase()))
    }
    return filtered
  }

  loginUser = (e, username, password) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('id', data.id)
          localStorage.setItem('admin', data.admin)
          localStorage.setItem('name', data.name)
          localStorage.setItem('username', data.username)
          this.setState({ currentUser: parseInt(data.id), userName: data.username, admin: data.admin, name: data.name })

          this.fetchMonuments()
        } else {
          alert(data.message)
        }
      })
  }

  logoutUser = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('name')
    this.setState({ currentUser: null, admin: false, userName: null })
  }


  render() {

    return (


      <Router>
        <div>
        <Route exact path='/map' render={() =>
            this.state.currentUser ? <Map currentUser={this.state.currentUser} monuments={this.state.monuments}/>
              : <Redirect to='/login' />} />
        </div>
        
        <NavBar
          search={this.changeSearchField}
          userName={this.state.userName}
          logout={this.logoutUser}
          currentUser={this.state.currentUser}
          remove={this.removedMon}
          name={this.state.name}
        />

        <Route path='/' render={() => {
          if (this.state.currentUser) {
            return <Redirect to='/monuments' />
          } else {
            return <Redirect to='/login' />
          }
        }} />


        <Route exact path='/login' render={() => <Login formSubmit={this.loginUser} user={this.loginUser} />
        } />

        <Route exact path='/register' render={() =>
          this.state.currentUser ? <Register /> : <Redirect to='/login' />
        } />

        <Route exact path='/about' render={() =>
          this.state.currentUser ? <About /> : <Redirect to='/login' />
        } />

        <Switch>
          <Route exact path='/monuments' render={() =>
            this.state.monuments.length === 0 ?
              <div>
                <Loader active inline='centered' />
                <div style={{ textAlign: 'center', color: '#a8a7b9' }}>Loading</div>
              </div>
              :
              <MonumentContainer monuments={this.state.monuments} search={this.state.searchField} />
          } />

          {/* <Route exact path='/map' render={() =>
            this.state.currentUser ? <Map currentUser={this.state.currentUser} monuments={this.state.monuments}/>
              : <Redirect to='/login' />} /> */}

          <Route exact path='/users/:id' render={() =>
            this.state.currentUser ? <UserProfile currentUser={this.state.currentUser} userName={this.state.userName} admin={this.state.admin} />
              : <Redirect to='/login' />} />

        </Switch>

      </Router>


    )
  }
}
