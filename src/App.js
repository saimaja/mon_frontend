import React, { Component } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import MonumentContainer from './components/MonumentContainer'
import MonumentDetail from './components/MonumentDetail'
import SideBar from './components/SideBar'
import { Grid } from 'semantic-ui-react'

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
    geojson: {type: 'FeatureCollection', 
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
      }]}
  }

  componentDidMount() {
    this.fetchMonuments()
  }

  componentDidUpdate() {
   this.fetchMap()
  }

  fetchMonuments = () => {
    fetch('http://localhost:3000/monuments')
      .then(resp => resp.json())
      .then(monuments => 
        {let mapMon = monuments.map( mon => {
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
        this.setState({...this.state, monuments: monuments, geojson: {...this.state.geojson, features: mapMon}})
        }
      )
  }

//   makeMapData = (arr) => {
//     let coordinates = arr.map(a => [a.longitude, a.latitude])
//     let title = arr.map(a => a.name)
//     let description = arr.map(a => a.honorees)
    
// }
  fetchMap = () => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.state.map_long, this.state.map_lat],
      zoom: this.state.zoom
    });
    const geojson = this.state.geojson;
    geojson.features.forEach(function (marker) {
      // create a HTML element for each feature
      let el = document.createElement('div');
      el.className = 'marker';
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
    });
  }

  


  render() {

    return (

      <div>
        <div className='mapContainer' ref={el => this.mapContainer = el} />
        {/* <MonumentContainer monuments={this.state.monuments}/> */}
      </div>

      // <Grid>
      //   <Grid.Column style={{ marginLeft: '20px' }}>
      //             <MonumentContainer style={{ width: '85%' }} monuments={this.state.monuments} />
      //   </Grid.Column>
      // </Grid>
    )
  }
}
