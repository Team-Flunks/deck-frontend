/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Background from './Background.js'
import KnowledgeEndModal from './KnowledgeEndModal.js'
import './css/Knowledge.css';
import { Modal } from 'react-bootstrap';

class Knowledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatement: '',
      currentStatementCandor: '',
      score: 0,
      rounds: 0,
      highScore: 0,
      selectedButton: '',
      gameState: false,
      showModal: false,
      showEndModal: false,
      didWin: false,
      tokens: 0,
      previousRound: false,
    }
  }

  componentDidMount() {
    this.getRecord();
    this.fetchStatement();
  }

  //Get past high scores for current user
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
            const singleGame = array.filter(game => game.game === "knowledgegame");
            console.log(singleGame)

            console.log(singleGame[0].highscore)

            this.setState({ highScore: singleGame[0].highscore });
          })
          .catch(err => console.error(err));
      })
  }

  fetchStatement = () => {
    // Generate random number (0 or 1) and send that to the server, as well as store in state value to store whether data recieved from server is truth or a lie.
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/knowledgegame`
        }
        axios(requestConfig)
          .then(response => {
            this.setState({ currentStatement: response.data.question });
            this.setState({ currentStatementCandor: response.data.answer });
            console.log('Current candor of the question: ', response.data.answer);
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
          url: `/updateUser/?game=knowledgegame&didWin=${this.state.didWin}&score=${this.state.score}`
        }
        axios(requestConfig)
          .then(response => {

            let array = response.data;
            console.log(array);

            const singleGame = array.filter(game => game.game === "knowledgegame");
            console.log(singleGame);

            this.setState({ highScore: singleGame[0].highscore });

            this.setState({ score: 0 });
            this.setState({ rounds: 0 });
          })
          .catch(err => console.error(err));
      })
  }


  testAnswer = () => {
    console.log(this.state.selectedButton);
    if (this.state.selectedButton === this.state.currentStatementCandor) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ previousRound: true });
    } else {
      this.setState({ previousRound: false });
    }
    this.setState({ rounds: this.state.rounds + 1 });
    if (this.state.rounds === 10) {
      this.handleEnd();
      this.setState({ gameState: false });
    }
    if (this.state.gameState) {
      this.fetchStatement();
    }
  }

  // 0 is truth, 1 is lie
  handleClick = async (boolean) => {
    await this.setState({ selectedButton: boolean });
    await this.setState({ gameState: true });
    this.testAnswer();
  }

  handleEnd = () => {
    this.setState({ showEndModal: true });
    if (this.state.score > 7) {
      this.setState({ tokens: this.state.tokens + 1 });
      this.setState({ didWin: true });
    } else {
      this.setState({ didWin: false });
    }
    this.sendGameData();
  }

  setEndModal = () => {
    this.setState({ showEndModal: false });
  }

  render() {
    return (
      <div>
        <Background />

        <section id="topKnow">
          <h1>The Knowledge Game</h1>

          <div className="gameStats">
            <h4>High score: {this.state.highScore} / 10</h4>
            <h4>Current Score: {this.state.score} / {this.state.rounds}</h4>

            <div id="instructions">
              <button id="instructionz" onClick={() => this.setState({ showModal: true })}>Instructions</button>
            </div>
          </div>
        </section>

        <section className="toFade" id="knowledge">

          {/* This could be moved to another module perhaps... Maybe a task for later. */}
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
                You will be faced with 10 statements that are either truths, or lies. You have to figure out which is which! You get ten rounds, and if you get more than 8 correct... We'll count that as a win :)
                    </p>
            </Modal.Body>
          </Modal>

          <KnowledgeEndModal showEndModal={this.state.showEndModal} didWin={this.state.didWin} callback={this.setEndModal} />

          {/* This is the current question asked */}
          <div id="statement">
            <h3>{this.state.currentStatement}</h3>
          </div>

          <div id="question">
            <h2>Hmmm... Is this a truth, or a lie?</h2>
          </div>

          {/* Display to user if they got previous round correct or wrong */}
          {this.state.gameState ?
            <div>
              <h2>You got the previous round {this.state.previousRound ? "right" : "wrong"}</h2>
            </div>
            :
            <div>
              <h2>Play a round to see your skill!</h2>
            </div>}

          <div id="buttons">
            <div>
              <button className="button" id="truth" onClick={() => this.handleClick(true)}>TRUTH</button>
            </div>
            <div>
              <button className="button" id="lie" onClick={() => this.handleClick(false)}>LIE</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth0(Knowledge);
