import {useEffect, useState} from 'react'
import Config from './config/config.en.json'
import './Game.css'
import RoleCard from './components/RoleCard'
import GameBoard from './components/GameBoard'
import Result from './components/Result'

export default function Game() {

    const [state, setState] = useState('idle')
    const [totalTime, setTotalTime] = useState(8)
    const [timeLeft, setTimeLeft] = useState(50)
    const [playerCount, setPlayerCount] = useState(5)
    const [playerOnTurn, setPlayerOnTurn] = useState(0)
    const [canShowCard, setCanShowCard] = useState(false)
    const [location, setLocation] = useState({})
    const [roles, setRoles] = useState([])
    const [interval, setTickInterval] = useState(null)
    const [useNames, setUseNames] = useState(false)
    const [names, setNames] = useState([])
    const [usePictures, setUsePictures] = useState(false)
    const [reusePictures, setReusePictures] = useState(false)
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        let parsedNames = []
        let storedNames = '<none>'
        try {
            storedNames = window.localStorage.names || '[]'
            parsedNames = JSON.parse(storedNames)
        } catch (e) {
            console.warn(`Can't parse stored names`)
            console.log(storedNames)
            console.error(e)
        }
        setNames(parsedNames)
        setUseNames(window.localStorage.useNames !== 'false')
        setUsePictures(window.localStorage.usePictures !== 'false')
    }, [])

    const handlePlayerCountChange = (event) => {
        setPlayerCount(event.target.value)
    }

    const handleTotalTimeChange = (event) => {
        console.log(event)
        setTotalTime(event.target.value)
    }

    const handleUseNamesChange = (event) => {
        const value = event.target.checked
        window.localStorage.useNames = value
        setUseNames(value)
    }

    const handleUsePicturesChange = (event) => {
        const value = event.target.checked
        window.localStorage.usePictures = value
        setUsePictures(value)
    }

    const handleReusePicturesChange = (event) => {
        const value = event.target.checked
        window.localStorage.reUsePictures = value
        setReusePictures(value)
    }

    const prepareGame = (event) => {
        event.preventDefault()
        const locations = Config.locations
        const locationId = Math.floor(Math.random() * locations.length)
        const location = locations[locationId]
        console.log(location)
        const roles = ['spy'].concat(location.roles.slice(0, playerCount - 1)).sort(() => Math.random() - 0.5)
        console.log(roles)
        setState('showing')
        setLocation(location)
        setRoles(roles)
        setPlayerOnTurn(0)
        setCanShowCard(false)
    }

    const resetNames = (event) => {
        event.preventDefault()
        setNames([])
    }

    const nextRoleClick = () => {
        if (!canShowCard) {
            setCanShowCard(true)
            return
        }

        if (playerOnTurn === playerCount - 1) {
            setState('ready')
        }


        setCanShowCard(false)
        setPlayerOnTurn(playerOnTurn + 1)
    }


    const startGame = (event) => {
        event.preventDefault()
        console.log('START', timeLeft)
        // setInterval(timeTick, 1000)
        setState('playing')
    }

    useEffect(() => {
        if (state === 'playing') {
            setTimeLeft(totalTime * 60)
            const interval = setInterval(() => {
                console.log('TICK', timeLeft)
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [state])


    const reveal = () => {
        setState('result')
    }

    const backToMenu = () => {
        setState('idle')
    }

    console.log(state)
    let gameComponent
    switch (state) {
        case 'idle':
            gameComponent = <div className="gameSettings">
                <input type="number" placeholder="Round time in minutes"
                       onChange={handleTotalTimeChange} value={totalTime} min={1} max={60}/>
                <input type="number" placeholder="Number of players" min={3} max={8} onChange={handlePlayerCountChange}
                       value={playerCount}/>
                <div>
                    <input type="checkbox" checked={useNames} onChange={handleUseNamesChange}/>
                    <input type="checkbox" checked={usePictures} onChange={handleUsePicturesChange}/>
                    {/*{usePictures && <input type="checkbox" onChange={handleReusePicturesChange}/>}*/}
                </div>
                <div>
                    <div className="button" onClick={prepareGame}>Start</div>
                </div>
                <div>
                    <div className="button reset" onClick={resetNames}>Reset</div>
                </div>
            </div>
            break
        case 'showing':
            gameComponent =
                <RoleCard
                    show={canShowCard}
                    playerId={playerOnTurn}
                    role={roles[playerOnTurn]}
                    onClick={nextRoleClick}
                    {...{
                        location,
                        names,
                        setNames,
                        useNames,
                        pictures,
                        setPictures,
                        usePictures,
                        reusePictures
                    }}
                />
            break
        case 'ready':
            gameComponent = <div>
                Everyone knows their role!<br/>
                <div className="button" onClick={startGame}>Start game</div>
            </div>
            break
        case 'playing':
            gameComponent = <GameBoard timeLeft={timeLeft} reveal={reveal} totalTime={totalTime}/>
            break
        case 'result':
            gameComponent = <Result
                onClick={backToMenu}
                {...{
                    roles,
                    location,
                    names,
                    pictures,
                    usePictures
                }}/>
    }
    return (
        <div className="game">
            {gameComponent}
        </div>
    )
}
