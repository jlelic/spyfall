import React from 'react'
import Config from '../config/config.en.json'

export default (props) => {
  console.log(props)
  const { show, playerId, onClick, role, location } = props
  if (!show) {
    return (<div>
      Player {playerId + 1}, click to reveal your card <br/>
      <button onClick={onClick}>Reveal</button>
    </div>)
  }
  if(role === 'spy') {
    return <div>
      You are {Config.spyRole}! <br/>
      <button onClick={onClick}>Next</button>
    </div>
  }
  return (
    <div>
      The location is: {location}<br/>
      You are {role}!<br/>
      <button onClick={onClick}>Next</button>
    </div>
  )
}