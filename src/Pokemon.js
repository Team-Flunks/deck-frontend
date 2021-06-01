/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Background from './Background.js'
import KnowledgeEndModal from './KnowledgeEndModal.js'
import './css/Pokemon.css';
import { Modal } from 'react-bootstrap';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      rounds: 0,
      highScore: 0,
      pokemon: ['first poke', 'second poke', 'third poke', 'fourth poke'],
      gameState: true,
      showModal: false,
      showEndModal: false,
      didWin: false,
    }
  }

  componentDidMount() {
    this.getRecord();
    this.fetchStatement();
  }

  //Get past high scores
  getRecord = () => {
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

            console.log(array)
            const singleGame = array.filter(game => game.game === "pokemongame");
            console.log(singleGame)

            console.log(singleGame[0].highscore)

            this.setState({ highScore: singleGame[0].highscore });
          })
          .catch(err => console.error(err));
      })
  }

  fetchStatement = () => {

    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: '/pokemongame',
        }
        axios(requestConfig)
          .then(response => {
            this.setState({ pokemon: response.data });
          })
          .catch(err => console.error(err));
      })
  }

  // When the game is over, send the game name, if they won, and the score. Get back times won, high score
  // Need to do an inital get of records when they enter page

  sendGameData = () => {

    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/updateUser/?game=pokemongame&didWin=${this.state.didWin}&score=${this.state.score}`
        }
        axios(requestConfig)
          .then(response => {

            let array = response.data;
            console.log(array)

            const singleGame = array.filter(game => game.game === "pokemongame");
            console.log(singleGame)

            this.setState({ highScore: singleGame[0].highscore });

            this.setState({ score: 0 })
            this.setState({ rounds: 0 })
          })
          .catch(err => console.error(err));
      })
  }



  // //FUNCTION TO DETERMINE WHEN POKEMON GAME ENDS that will call handleEnd

  handleEnd = () => {
    this.setState({showEndModal: true});

    if (this.state.score > 7){
      this.setState({didWin: true});
    } else {
      this.setState({didWin: false});
    }

    this.sendGameData();

  }

  setEndModal = (value) => {
    this.setState({showEndModal: false})
  }


  render() {
    return (
      <div>
      <Background />

      <div id="top">
      <h1>The Pokemon Game</h1>

        <div className="gameStats">
          <h4>High score: {this.state.highScore} / 10</h4>
          <h4>Current Score: {this.state.score} / {this.state.rounds}</h4>

          <div id="instructions">
            <button id="instructionz" onClick={() => this.setState({ showModal: true })}>Instructions</button>
          </div>
        </div>

       <section className="toFade" id="pokemon">

          <Modal
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
            id="modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="modal-title">
                          Instructions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                 You will be faced with some Pokemon. blah blah blah We'll count that as a win :)
                </p>
            </Modal.Body>
          </Modal>

          <KnowledgeEndModal showEndModal={this.state.showEndModal} score={this.state.score} callback={this.setEndModal}/>

        {/* {!this.state.gameState
          ?     
          <KnowledgeEndModal showEndModal={this.state.showEndModal} score={this.state.score} callback={this.setEndModal}/>
          : null} */}
        <div id="Pokestatement">
          <h3>Statement Will Be Here{this.state.currentStatement}</h3>
        </div>

        <div id="question">
          <h2>Hmmm... Is this a truth, or a lie?</h2>
        </div>


        {/* Will pass the number in the array of the pokemon clicked */}
        <div id="pokemon-names">
          <div>
            <button className="poke-button" id="first" onClick={() => this.handleClick(0)}>{this.state.pokemon[0]}</button>
          </div>
          <div>
            <button className="poke-button" id="second" onClick={() => this.handleClick(1)}>{this.state.pokemon[1]}</button>
          </div>
          <div>
            <button className="poke-button" id="third" onClick={() => this.handleClick(2)}>{this.state.pokemon[2]}</button>
          </div>
          <div>
            <button className="poke-button" id="fourth" onClick={() => this.handleClick(3)}>{this.state.pokemon[3]}</button>
          </div>

        </div>
        </section>
        </div>
        </div>

    )
  }
}

export default withAuth0(Pokemon);
