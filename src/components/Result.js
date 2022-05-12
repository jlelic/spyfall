import {useEffect, useRef} from 'react'
import Config from '../config/config.en.json'
import Webcam from 'react-webcam'
import LocationCard from './LocationCard'

import './RoleCard.css'

export default (props) => {
    const {
        onClick,
        roles,
        location,
        names,
        pictures,
        usePictures
    } = props

    const spyId = roles.indexOf('spy')

    return (
        <div className="result">
            <div>
                Location was:
            </div>
            <LocationCard location={location} big={true}/>

            Spy was <span className="roleName spy">{names[spyId]}</span>
            {usePictures && <img src={pictures[spyId]}
                width={300}
                height={300}/>}
            <div className="button" onClick={onClick}>Back to menu</div>
        </div>
    )
}
