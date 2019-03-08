import React, { Component } from 'react'
import * as Config from './config/config.en.json'
import './App.css'
import RoleCard from './components/RoleCard'
import GameBoard from './components/GameBoard'

class App extends Component {

  constructor() {
    super()
    this.state = {
      state: 'idle',
      totalTime: 8,
      playerCount: 5,
      playerOnTurn: 0,
      canShowCard: false,
      location: {},
      roles: [],
      timeLeft: 0
    }

    this.locations = Config.locations
    console.log(this.locations.length)
    this.handlePlayerCountChange = this.handlePlayerCountChange.bind(this)
    this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this)
    this.prepareGame = this.prepareGame.bind(this)
    this.nextRoleClick = this.nextRoleClick.bind(this)
    this.startGame = this.startGame.bind(this)
    this.timeTick = this.timeTick.bind(this)
    this.reveal = this.reveal.bind(this)
  }

  handlePlayerCountChange(event) {
    this.setState({ playerCount: event.target.value })
  }

  handleTotalTimeChange(event) {
    this.setState({ totalTime: event.target.value })
  }

  prepareGame(event) {
    event.preventDefault()
    const locationId = Math.floor(Math.random() * this.locations.length)
    const location = this.locations[locationId]
    console.log(location)
    const roles = ['spy'].concat(location.roles.slice(0, this.state.playerCount - 1)).sort(() => Math.random() - 0.5);
    console.log(roles);
    this.setState({
      state: 'showing',
      location,
      roles,
      playerOnTurn: 0,
      canShowCard: false
    })
  }

  nextRoleClick() {
    if (!this.state.canShowCard) {
      this.setState({ canShowCard: true });
      return;
    }

    if(this.state.playerOnTurn === this.state.playerCount-1) {
      this.setState({state: 'ready'})
    }


    this.setState({
      canShowCard: false,
      playerOnTurn: this.state.playerOnTurn + 1
    });
  }


  startGame(event) {
    this.interval = setInterval(this.timeTick, 1000)
    event.preventDefault()
    this.setState({
      state: 'playing',
      timeLeft: this.state.totalTime*60
    })
  }

  timeTick() {
    this.setState({timeLeft: this.state.timeLeft -1})
  }

  reveal() {
    const spyId = this.state.roles.indexOf('spy') + 1
    alert(`The location was ${this.state.location.name}\n${Config.spyRole} was player ${spyId}`)
    this.setState({state: 'idle'})
    clearInterval(this.interval)
  }

  render() {
    const { state, canShowCard, playerOnTurn, roles, location } = this.state;
    let gameComponent;
    switch (state) {
      case 'idle':
        gameComponent = <div>
          <input type="number" placeholder="Round time in minutes" onChange={this.handleTotalTimeChange.bind(this)} value={this.state.totalTime}/>
          <input type="number" placeholder="Number of players" onChange={this.handlePlayerCountChange.bind(this)} value={this.state.playerCount}/>
          <button onClick={this.prepareGame}>Start</button>
        </div>
        break
      case 'showing':
        gameComponent =
          <RoleCard
            show={canShowCard}
            playerId={playerOnTurn}
            role={roles[playerOnTurn]}
            onClick={this.nextRoleClick}
            location={location.name}/>
        break
      case 'ready':
        gameComponent = <div>
          Everyone knows their role!<br/>
          <button onClick={this.startGame}>Start game</button>
        </div>
        break
      case 'playing':
        gameComponent = <GameBoard timeLeft={this.state.timeLeft} reveal={this.reveal}/>
    }
    return (
      <div className="App">
        { gameComponent }
      </div>
    );
  }
}

export default App;
