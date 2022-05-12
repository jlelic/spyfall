import React from 'react'
import Config from '../config/config.en.json'
import './LocationGrid.css'
import LocationCard from './LocationCard'


export default (props) => {
  return <div className="locationGrid">
    {Config.locations.map((location) =><LocationCard location={location}/> )}
  </div>
}
