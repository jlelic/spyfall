import React from 'react'

import LocationGrid from './LocationGrid'

 const formatSeconds = (x) => {
  let sec_num = parseInt(x.toString(), 10); // don't forget the second param
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

export default (props) => {
  const { timeLeft, reveal } = props
  return <div style={{height: "100%"}}>
    <div className="timer">
      {formatSeconds(timeLeft)} <button onClick={reveal}>Reveal</button>
    </div>
    <LocationGrid/>
  </div>
}