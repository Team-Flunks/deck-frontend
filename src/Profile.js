/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import './css/Profile.css';
import Background from './Background.js'


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledge: [],
      pokemon: [],
      pokePercentage: null,
      knowPercentage: null,
    }
  }


  componentDidMount() {
    this.getRecords();
  }

  //Get past high scores
  getRecords = () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/singleUser`
        }
        axios(requestConfig)
          .then(response => {
            let array = response.data.gameRecords;

            const pokemon = array.filter(game => game.game === "pokemongame");
            const knowledge = array.filter(game => game.game === "knowledgegame");

            console.log(pokemon)
            console.log(knowledge)

            this.setPokeStates(pokemon, knowledge);

          })
          .catch(err => console.error(err));
      })
  }

  setPokeStates = async (pokemon, knowledge) => {

    await this.setState({ knowledge: knowledge[0], pokemon: pokemon[0]})

    console.log(this.state.knowledge);

    let pp = ((100 * this.state.pokemon.timesWon) / this.state.pokemon.timesPlayed).toFixed(1);

    let kp = ((100 * this.state.knowledge.timesWon) / this.state.knowledge.timesPlayed).toFixed(1);

    

    this.setState({ pokePercentage: pp, knowPercentage: kp })

  }


  render() {
    return (
      <>
        <Background />
        <section id="profile-overall">
          <div className="profileData toFade">
            <div id="heading">
              <div id="profile-lines">
                <div className="profile-divider"></div>
                <h1>My Profile</h1>
                <div className="profile-divider"></div>
              </div>
              <img src={this.props.auth0.user.picture} alt="User Picture" />
            </div>

            <div id="user-email">
              <h2>My Information</h2>
              <h3>Username: {this.props.auth0.user.nickname}</h3>
              <div className="stat-divider"></div>
              <h3>Email: {this.props.auth0.user.email}</h3>
            </div>
          </div>

          {/* <h1 id="profile-game-stats">My Game Stats</h1> */}

          <div className="knowledge">
            <h2>Knowledge Game</h2>
            <h3>High Score: {this.state.knowledge.highscore} / 10</h3>
            <div className="stat-divider"></div>
            <h3>Times Played: {this.state.knowledge.timesPlayed}</h3>
            <div className="stat-divider"></div>
            <h3>Percentage of Times Won: {this.state.knowPercentage} %</h3>
          </div>


          <div className="pokemon">
            <h2>Pokemon Game</h2>
            <h3>High Score: {this.state.pokemon.highscore} / 5</h3>
            <div className="stat-divider"></div>
            <h3>Times Played: {this.state.pokemon.timesPlayed}</h3>
            <div className="stat-divider"></div>
            <h3>Percentage of Times Won: {this.state.pokePercentage} %</h3>
          </div>
        </section>
      </>
    )
  }
}

export default withAuth0(Profile);
