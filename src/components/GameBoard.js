import React from 'react'

import LocationGrid from './LocationGrid'

import './GameBoard.css'
import Timer from './Timer'

export default (props) => {
  return <div className="gameBoard">
    <Timer {...props} />
    <LocationGrid/>
  </div>
}
