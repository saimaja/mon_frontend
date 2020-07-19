import React, { Component } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import MonumentContainer from './components/MonumentContainer'
import MonumentDetail from './components/MonumentDetail'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Loader } from 'semantic-ui-react'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpbWFqYSIsImEiOiJja2NwZ3A3MXcwZ3Z2MnNsZTE1OXR0MWk1In0.EffvATu2f0N_tMT17bK7Zw';


export default class App extends Component {

  state = {
    monuments: [],
    searchField: '',
    currentUser: null,
    admin: false,
    userName: null,
    map_long: -108,
    map_lat: 40,
    zoom: 3.2,
    geojson: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: []
        },
        properties: {
          title: '',
          description: ''

        }
      },
      ]
    }
  }

  componentDidMount() {
    if (localStorage.getItem('id') && localStorage.getItem('admin')) {
      this.setState({ currentUser: parseInt(localStorage.getItem('id')), admin: localStorage.getItem('admin') === 'true' ? true : false, userName: localStorage.getItem('username') })
      this.fetchMonuments()
    }
  }

  // componentDidUpdate() {
  //   this.fetchMap()
  // }

  fetchMonuments = () => {
    fetch('http://localhost:3000/monuments')
      .then(resp => resp.json())
      .then(monuments => {
        let mapMon = monuments.map(mon => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [mon.longitude, mon.latitude]
            },
            properties: {
              title: mon.name,
              description: mon.honorees

            }
          }
        })
        this.setState({ ...this.state, monuments: monuments, geojson: { ...this.state.geojson, features: mapMon } })
      }
      )
  }

  // changeSearchField = (e) => {
  //   this.setState({ searchField: e.target.value })
  // }

  // filteredMon = () => {
  //   this.state.monuments.filter(mon => mon.name.toLowerCase().includes(this.changeSearchField.toLowerCase()))

  // }


  // fetchMap = () => {
  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/mapbox/light-v10',
  //     center: [this.state.map_long, this.state.map_lat],
  //     zoom: this.state.zoom
  //   });
  //   const geojson = this.state.geojson;
  //   geojson.features.forEach(function (marker) {
  //     // create a HTML element for each feature
  //     let el = document.createElement('div');
  //     el.className = 'marker';
  //     // make a marker for each feature and add to the map
  //     new mapboxgl.Marker(el)
  //       .setLngLat(marker.geometry.coordinates)
  //       .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  //       .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
  //       .addTo(map);
  //   });
  // }

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
        this.setState({ currentUser: parseInt(data.id), userName: data.name, admin: data.admin})

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
        <Route path='/' render={() => {
          if(this.state.currentUser) {
            return <Redirect to='/monuments'/>
          } else {
            return <Redirect to='/login'/>
          }
        }}/>

        <Route exact path='/login' render={() => <Login formSubmit={this.loginUser} user={this.loginUser} />} />

        <Route exact path='/register' render={() => <Register />} />

        <Route exact path='/monuments' render={() => <MonumentContainer monuments={this.state.monuments}/>}/>

        
{/*         
        <Grid style={{ marginTop: '10px', marginRight: '500px' }} columns={2}>
          <Grid.Column style={{ width: '15%' }}>
            <NavBar 
            search={this.changeSearchField}
            userName={this.state.userName}
            logout={this.logoutUser}
           />
          </Grid.Column>

          {!this.state.admin ?
            <Switch>
              {/* <Route exact path='/cart' render={() =>
          <Cart refreshIndex={this.refreshIndex} />}
          /> */}
              {/* <Route exact path='/monuments' render={() =>
                this.state.monuments.length === 0 ?

                  <Grid.Column style={{ marginLeft: '20px' }}>
                    <Loader active inline='centered' />
                    <div style={{ textAlign: 'center', color: '#a8a7b9' }}>Loading</div>
                  </Grid.Column>

                  :

                  <Grid.Column style={{ marginLeft: '20px' }}>
                    <MonumentContainer style={{ width: '85%' }} monuments={this.state.monuments} />
                  </Grid.Column>
              } />

              <Route exact path='/monuments/:id' render={(props) =>

                <Grid.Column>
                  <MonumentDetail currentUser={this.state.currentUser} style={{ width: '75%' }} id={props.match.params.id} />
                </Grid.Column>
              } />
            </Switch> :
            <Switch>
              <Route to='/dashboard' render={() =>
                <Grid.Column>
                  <Dashboard
                    userName={this.state.userName}
                  />
                </Grid.Column>
              } />
            </Switch>}
        </Grid>  */}
      {/* */}
      </Router>

    )
  }
}
