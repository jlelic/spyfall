import {useEffect, useRef} from 'react'
import Config from '../config/config.en.json'
import Webcam from 'react-webcam'
import LocationCard from './LocationCard'

import './RoleCard.css'

export default (props) => {
    const {
        show,
        playerId,
        onClick,
        role,
        location,
        names,
        setNames,
        useNames,
        setPictures,
        pictures,
        usePictures
    } = props

    const defaultName = 'Player ' + (playerId + 1)
    useEffect(() => {
        if (playerId + 1 >= names.length) {
            setNames([...names, defaultName])
        }
    }, [playerId])

    const webcamRef = useRef(null)

    const name = names[playerId]
    if (!show) {
        return (<div>
            {defaultName}{name == defaultName ? '' : ` (${name})`}, click to reveal your card <br/>
            <div className="button" onClick={onClick}>Reveal</div>
        </div>)
    }


    const handleNameChange = (event) => {
        names[playerId] = event.target.value
        window.localStorage.names = JSON.stringify(names)
        setNames([...names])
    }

    const onConfirmPlayerCard = () => {
        if (usePictures) {
            const picture = webcamRef.current.getScreenshot()
            setPictures([...pictures, picture])
            console.log('Save picture', playerId)
            setTimeout(onClick, 500)
        } else {
            onClick()
        }
    }

    if (role === 'spy') {
        return <div>
            <div>
            You are <span className="roleName spy">{Config.spyRole}</span>! <br/>
            </div>
            <div>
                {
                    useNames && <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
                }
            </div>
            <div>
                {usePictures && <Webcam
                    width={300}
                    height={300}
                    ref={webcamRef}
                    videoConstraints={{
                        facingMode: "user"
                    }}/>}
            </div>
            <div className="button" onClick={onConfirmPlayerCard}>Confirm</div>
        </div>
    }


    return (
        <div className="roleCard">
            <LocationCard location={location}/>
            <div>
                You are <span className="roleName">{role}</span>!
            </div>
            {
                useNames && <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
            }

            {usePictures && <Webcam
                width={300}
                height={300}
                ref={webcamRef}
                videoConstraints={{
                    facingMode: "user"
                }}/>}
            <div className="button" onClick={onConfirmPlayerCard}>Confirm</div>
        </div>
    )
}
