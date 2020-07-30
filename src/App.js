import React, { Component } from 'react'
import './App.css'
import MonumentContainer from './components/MonumentContainer'
import Blogs from './components/Blogs'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Map from './components/Map'
import About from './components/About'
import Register from './components/Register'
import MonumentDetail from './components/MonumentDetail'
import Travelogue from './components/Travelogue'
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'



export default class App extends Component {

  state = {
    monuments: [],
    filter: 'none',
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

    /*
      let doneFetching = false
      while (doneFetching !== true) {
        fetch(`http://localhost:3000/monuments?page=#{pageNo}`)
          .then(resp => resp.json())
          .then(data => {
              doneFetching = data.done
              this.setState({
                monuments: [...this.state.monuments, ...data.monuments]
              })
          })
      }
    */
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  removedMon = () => {
    return this.state.monuments.filter(mon => mon.year_removed)
  }

  renamedMon = () => {
    return this.state.monuments.filter(mon => mon.name.includes('rename'))

  }

  filter = () => {
    if (this.state.filter === 'none') {
      return this.state.monuments
    } else if (this.state.filter === 'removed') {
      return this.removedMon()
    } else if (this.state.filter === 'renamed') {
      return this.renamedMon()
    }
  }

  changeFilter = (filter) => {
    this.setState({ filter: filter })
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
            this.state.currentUser ?
              <Map
                monuments={this.filter()}
              />
              : <Redirect to='/login' />} />
        </div>

        <NavBar
          search={this.changeSearchField}
          userName={this.state.userName}
          logout={this.logoutUser}
          currentUser={this.state.currentUser}
          name={this.state.name}
          changeFilter={this.changeFilter}
          filter={this.state.filter}
          monuments={this.filter()}

        />

        <Route path='/' render={() => {
          if (this.state.currentUser) {
            return <Redirect to='/monuments' />
          } else {
            return <Redirect to='/login' />
          }
        }} />


        <Route exact path='/login' render={() =>
          <Login formSubmit={this.loginUser}
            user={this.loginUser} />
        } />

        <Route exact path='/register' render={() =>
          this.state.currentUser ? <Register /> : <Redirect to='/login' />
        } />

        <Route exact path='/about' render={() =>
          this.state.currentUser ? <About /> : <Redirect to='/login' />
        } />

        <Route exact path='/blogs' render={() =>
          this.state.currentUser ? <Blogs /> : <Redirect to='/login' />
        } />

        <Switch>
          <Route exact path='/monuments' render={() =>
            this.state.monuments.length === 0 ?
              <div>
                <Loader active inline='centered' />
                <div style={{ textAlign: 'center', color: '#a8a7b9' }}>Loading</div>
              </div>
              :
              <MonumentContainer
                currentUser={this.state.currentUser}
                monuments={this.filter()}
                filter={this.state.filter}
                search={this.state.searchField} />
          } />

          {/* <Route exact path='/map' render={() =>
            this.state.currentUser ? <Map currentUser={this.state.currentUser} monuments={this.state.monuments}/>
              : <Redirect to='/login' />} /> */}

          <Route exact path='/users/:id' render={() =>
            this.state.currentUser ?
              <UserProfile
                currentUser={this.state.currentUser}
                userName={this.state.userName}
                admin={this.state.admin}
                name={this.state.name}
                monuments={this.state.monuments} />
              : <Redirect to='/login' />} />


          <Route exact path='/monuments/:id' render={() => 
            this.state.currentUser ?
              <MonumentDetail
                currentUser={this.state.currentUser}
                name={this.state.name}
                admin={this.state.admin}
                monuments={this.state.monuments} />
              : <Redirect to='/login' />} />

          <Route exact path='/travelogues/:id' render={() =>
            this.state.currentUser ?
              <Travelogue
                currentUser={this.state.currentUser}
                name={this.state.name}
                monuments={this.state.monuments} />
              : <Redirect to='/login' />} />

        </Switch>

      </Router>


    )
  }
}
