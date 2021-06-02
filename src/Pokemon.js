/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Background from './Background.js'
import KnowledgeEndModal from './KnowledgeEndModal.js'
import './css/Pokemon.css';
import { Modal } from 'react-bootstrap';
import pokedex from './Pokedex.png'

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      rounds: 0,
      highScore: 0,
      pokemon: [],
      target: null,
      imageSrc: pokedex,
      selectedButton: null,
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

            console.log(singleGame[0])

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
          url: '/pokeInfo',
        }
        axios(requestConfig)
          .then(response => {
            console.log()
            this.setState({ pokemon: response.data.names });
            this.setState({ target: response.data.target });
            this.setState({ imageSrc: response.data.imageSrc });

            console.log(this.state.target)
          })
          .catch(err => console.error(err));
      })
  }

  // When the game is over, send the game name, if they won, and the score. Get back times won, high score
  // Need to do an inital get of records when they enter page

  sendGameData = () => {

    console.log(this.state.didWin);

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


// Test if the poke that was clicked is equal to the target sent by server
  testAnswer = () => {

    if (this.state.selectedButton === this.state.target) {
      this.setState({ score: this.state.score + 1 });
    }
    this.setState({ rounds: this.state.rounds + 1 });
    if (this.state.rounds === 5) {
      this.handleEnd();
    }
    if (this.state.gameState) {
      this.fetchStatement();
    }
  }

  // set selected button equal to 0-3, so correspond with the poke that was clicked
  handleClick = async (e) => {
    await this.setState({ selectedButton: e });
    this.testAnswer();
  }


  // //FUNCTION TO DETERMINE WHEN POKEMON GAME ENDS that will call handleEnd

  handleEnd = async () => {
    this.setState({showEndModal: true});

    if (this.state.score > 3){
      await this.setState({didWin: true});
    } else {
      await this.setState({didWin: false});
    }

    console.log(this.state.didWin);

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
          <h4>High score: {this.state.highScore} / 5</h4>
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
                 You will be faced with an image of one of the pokemon, and four names. You will have to choose which pokemon name matches the image of the character! You have 5 tries. If you get 4/5 or higher, we'll consider that a win. <br></br>Hope you've been studying :)
                </p>
            </Modal.Body>
          </Modal>

          <KnowledgeEndModal showEndModal={this.state.showEndModal} didWin={this.state.didWin} callback={this.setEndModal}/>


        <div id="poke-picture">
          <img src={this.state.imageSrc} />
        </div>

        <div id="question">
          <h2>Hmmm... which pokemon is this?</h2>
        </div>


        {/* Will pass the number in the array of the pokemon clicked */}
        
        <div id="pokemon-names">
        <div>
          <div className="poke-button-case">
            <button className="poke-button" id="first" onClick={() => this.handleClick(0)}>{this.state.pokemon[0]}</button>
          </div>
          </div>
          <div>
          <div className="poke-button-case">
            <button className="poke-button" id="second" onClick={() => this.handleClick(1)}>{this.state.pokemon[1]}</button>
          </div>
          </div>
          <div>
          <div className="poke-button-case">
            <button className="poke-button" id="third" onClick={() => this.handleClick(2)}>{this.state.pokemon[2]}</button>
          </div>
          </div>
          <div>
          <div className="poke-button-case">
            <button className="poke-button" id="fourth" onClick={() => this.handleClick(3)}>{this.state.pokemon[3]}</button>
          </div>
          </div>

        </div>
        </section>
        </div>
        </div>

    )
  }
}

export default withAuth0(Pokemon);
