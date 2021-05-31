/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

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
        <h1>You are on the Knowledge page</h1>
        <div className="gameStats">
          <h4>High score</h4>
          <h4>{this.state.score}</h4>
          <h4>Instructions</h4>
        </div>
        {!this.state.gameState
          ? <h2>Thanks for playing! You {this.state.score >= 8 ? "did" : "did not"} get a token!</h2>
          : null}
        <h3>{this.state.currentStatement}</h3>
        <h2>So... Is this a true fact, or is this a lie?</h2>
        <button onClick={() => this.handleClick(0)}>Truth</button>
        <button onClick={() => this.handleClick(1)}>Lie</button>
      </>
    )
  }
}

export default withAuth0(Knowledge);
