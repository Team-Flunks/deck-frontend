/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Background from './Background.js'
import './css/Knowledge.css';
import { Modal } from 'react-bootstrap';


class Knowledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatement: '',
      currentStatementCandor: null,
      score: 0,
      rounds: 0,
      selectedButton: null,
      gameState: true,
      showModal: false,
    }
  }

  componentDidMount() {
    this.fetchStatement();
  }

  fetchStatement = () => {
    // Generate random number (0 or 1) and send that to the server, as well as store in state value to store whether data recieved from server is truth or a lie.
    this.setState({ currentStatementCandor: Math.floor(Math.random() * 2) });
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/knowledgegame/?currentCandor=${this.state.currentStatementCandor}`
        }
        axios(requestConfig)
          .then(response => {
            this.setState({ currentStatement: response.data });
          })
          .catch(err => console.error(err));
      })
  }

  testAnswer = () => {
    if (this.state.selectedButton === this.state.currentStatementCandor) {
      this.setState({ score: this.state.score + 1 });
    }
    this.setState({ rounds: this.state.rounds + 1 });
    if (this.state.rounds === 10) {
      this.setState({ gameState: false });
    }
    if (this.state.gameState) {
      this.fetchStatement();
    }
  }

  // 0 is truth, 1 is lie
  handleClick = (e) => {
    this.setState({ selectedButton: e });
    this.testAnswer();
  }

  render() {
    return (
      <>
        <Background />

        <section className="toFade" id="knowledge">

          <h1>The Knowledge Game</h1>

          <div className="gameStats">
            <h4>High score: (tbd)</h4>
            <h4>Current Score: {this.state.score}</h4>

            <div id="instructions">
              <button id="instructionz" onClick={() => this.setState({ showModal: true })}>Instructions</button>
            </div>

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
                  You will be faced with 10 statements that are either truths, or lies. You have to figure out which is which! You get ten rounds, and if you get more than 5 correct... We'll count that as a win :)
                  </p>
              </Modal.Body>
            </Modal>

          </div>


          {!this.state.gameState
            ? <h2>Thanks for playing! You {this.state.score >= 8 ? "did" : "did not"} get a token!</h2>
            : null}
          <div id="statement">
            <h3>Statement Will Be Here{this.state.currentStatement}</h3>
          </div>

          <div id="question">
            <h2>Hmmm... Is this a truth, or a lie?</h2>
          </div>


          <div id="buttons">
            <div>
              <button className="button" id="truth" onClick={() => this.handleClick(0)}>TRUTH</button>
            </div>
            <div>
              <button className="button" id="lie" onClick={() => this.handleClick(1)}>LIE</button>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default withAuth0(Knowledge);
