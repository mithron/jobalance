import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'

import * as Trud from './apis/trudvsem'
import * as CVs from './apis/myApi'


const MAP_ID = 'map'

class Map extends Component {
    
   static propTypes = {
    retRegion: PropTypes.func.isRequired,
    region: PropTypes.number.isRequired, 
    text : PropTypes.string.isRequired,
  }

    constructor(props) {
        super(props);
        this.map = null
        this.retRegion = this.props.retRegion
        this.state = {
            text: this.props.text, 
            region: this.props.region,
            regions: [],
            cvMarkers: [],
            vacMarkers: []
        }
        
    }

    componentDidMount() {
        this.initLeaflet()
    }
    
    componentWillReceiveProps(nextProps) {
          let newmarkers = []
          console.log(nextProps) 
          console.log(nextProps.text.length)    

          if (nextProps.text.length ) {
            this.state.cvMarkers.forEach((marker) => {
                console.log(marker)
                CVs.cvByTextRegionTotal(marker.regionId, nextProps.text)
                .then((total) => { 
                    console.log(total)
                    marker.setRadius(total/200)
                    newmarkers.push(marker)
        }) })   }
        else {
            this.state.cvMarkers.forEach((marker) => {
              
                CVs.cvByRegionTotal(marker.regionId)
                .then((total) => { 

                    marker.setRadius(total/200)
                    newmarkers.push(marker)
        }) })
        }
        this.setMarkers(newmarkers, this.state.vacMarkers)
            

        
    }
    
    regions = () => 
        fetch('/static/regions_small_edited.geojson').then(resp => resp.json())
  
    svgToIcon = (svg) => {
        const url = encodeURI("data:image/svg+xml," + svg).replace('#','%23');
        console.log(url);
        const CustomIcon = L.Icon.extend({
			options: {
				iconSize:     [40, 40],
				shadowSize:   [50, 64],
				iconAnchor:   [22, 94],
				shadowAnchor: [4, 62],
				popupAnchor:  [-3, -76]
			}
	    });
        return new CustomIcon({iconUrl: url})
    }
    
    setMarkers = (cvs, vacs) => {
        this.setState((state) => ({
            ...state,   cvMarkers: cvs,
            vacMarkers: vacs
        }))
        
    }
    
  
    initLeaflet() {
        console.log(this.state.text)
        const map = L.map(MAP_ID)
        const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const osm = new L.TileLayer(
            osmUrl, {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        )
        map.setView(new L.LatLng(63.0477661,107.335619), 3)
        map.addLayer(osm)
        
        const defStyle = { color: "#420000", fillColor: '#FED976', fillOpacity: 0.1, weight: 1 }; 
        const defMarkerStyle = {...defStyle, fillOpacity: 0.7 }
        
        let vacMarkers = []
        let cvMarkers = []
        
        this.regions().then((regions) => {
            const retRegion = this.retRegion

            const borders = new L.geoJson(regions, { 
                style: defStyle,
                onEachFeature: (feature, layer) =>{
                    if (feature.geometry) {
                        if (feature.properties.center) {
                            if (feature.properties.regionId) {
                                Trud.vacanciesByRegionTotal(feature.properties.regionId)
                                .then((total) => { 
                                    const vacMarker = new L.circleMarker(new L.LatLng(feature.properties.center.lat, feature.properties.center.lng),
                                                { radius: total/200 }).setStyle(defStyle).bringToFront().addTo(map)
                                    vacMarker.regionId = feature.properties.regionId            
                                    vacMarkers.push(vacMarker)
                                })
                                if (this.state.text){
                                    CVs.cvByTextRegionTotal(feature.properties.regionId, this.state.text)
                                .then((total) => { 
                                    const cvMarker = new L.circleMarker(new L.LatLng(feature.properties.center.lat, feature.properties.center.lng),
                                        { radius: total/200 }).bringToFront().addTo(map)
                                    cvMarker.regionId = feature.properties.regionId
                                    cvMarkers.push(cvMarker)
                                    })
                                }
                                else {
                                     CVs.cvByRegionTotal(feature.properties.regionId)
                                    .then((total) => { 
                                    const cvMarker = new L.circleMarker(new L.LatLng(feature.properties.center.lat, feature.properties.center.lng),
                                        { radius: total/200 }).bringToFront().addTo(map)
                                    
                                    cvMarker.regionId = feature.properties.regionId
                                    cvMarkers.push(cvMarker)
                                    })
                                }
                            }
                        }
                    }
                    layer.on({
                      mouseover: (e) => {
                          const selectedFeature = e.target
                          selectedFeature.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
                    
                      },
                      mouseout: (e) => {
                          const selectedFeature = e.target
                          selectedFeature.setStyle(defStyle)
                      },
                      click: (e) => {
                           const selectedFeature = e.target
                           map.fitBounds(selectedFeature.getBounds());
                           retRegion(e.target)
                      }
                      })
                }
                
            })
            map.scrollWheelZoom.disable()
            borders.on('click', (e) => {
                console.log(e.target)
            })
            
            map.addLayer(borders)
            
        }).then(() => {
                vacMarkers.forEach((marker) => marker.bringToFront())
            }).then(() => {cvMarkers.forEach((marker) => marker.bringToFront()) })
        
        this.setMarkers(cvMarkers,vacMarkers)
        this.map = map

    }
    render() {
        return <div id={MAP_ID} />
    }

}


export default Map