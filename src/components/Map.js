import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
// import { Loader } from 'semantic-ui-react'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()


const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = accessToken

export default class Map extends Component {

    state = {
        // monuments: [],
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
        this.fetchMonuments(this.fetchMap)
    }

    componentDidUpdate(prevProps) {
        if (this.props.monuments.length !== prevProps.monuments.length) {
            this.fetchMonuments(this.fetchMap)
            // this.fetchMap()
        }
    }

    fetchMonuments = (cb = () => { }) => {
        // fetch('http://localhost:3000/monuments')
        //     .then(resp => resp.json())
        //     .then(monuments => {
        let mapMon = this.props.monuments.map(mon => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [mon.longitude, mon.latitude]
                },
                properties: {
                    title: mon.name,
                    description: [mon.city, mon.state],
                    URL: `/monuments/${mon.id}`

                }
            }
        })
        this.setState({
            // ...this.state, monuments: monuments, 
            geojson: { ...this.state.geojson, features: mapMon }
        },
            cb)
        // }
        // )
    }

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
                .setHTML('<h3><a href="' + marker.properties.URL + '">' + marker.properties.title + '</a></h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });
    }

    render() {
        return (
            
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>

        )
    }
}
