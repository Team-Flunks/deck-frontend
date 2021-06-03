import React from 'react';
import axios from 'axios';
import Background from '../Background.js'
import PastRewards from './PastRewards.js'
import '../css/Token.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Modal } from 'react-bootstrap';



class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: 0,
      rewardQuote: {},
      rewardImage: '',
      showModal: false,
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  //Get past high scores for current user
  getUserData = () => {
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
            let startingTokenNum = response.data.tokenCount;

            console.log(startingTokenNum)

            this.setState({ tokens: startingTokenNum });
          })
          .catch(err => console.error(err));
      })
  }


  getRewardQuote = () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',

          // server team will let us know what path to use
          url: `/rewardRequestQuote`
        }
        axios(requestConfig)
          .then(response => {

            console.log(response.data);

            let rewardString = response.data;

            console.log(rewardString);

            this.setState({ rewardQuote: rewardString });

            if (this.state.tokens > 0) {
              this.setState({ tokens: this.state.tokens - 1 });
            }
          })
          .catch(err => console.error(err)); // if an error, print out error
      })
  }

  getRewardImage = () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',

          // server team will let us know what path to use
          url: `/rewardRequestImage`
        }
        axios(requestConfig)
          .then(response => {

            console.log(response.data);

            let rewardString = response.data.imageSrc;

            console.log(rewardString);

            this.setState({ rewardImage: rewardString });

            if (this.state.tokens > 0) {
              this.setState({ tokens: this.state.tokens - 1 });
            }
          })
          .catch(err => console.error(err)); // if an error, print out error
      })
  }

  handleClickQuote = async () => {

    await this.getRewardQuote();

  }

  handleClickImage = async () => {

    await this.getRewardImage();

  }


  render() {
    return (
      <>
        <Background />

        <section id="topKnow-token">
          <h1>The Token Page</h1>

          <div className="gameStats-token">
            <h4>Tokens: {this.state.tokens}</h4>

            <div id="instructions">
              <button id="instructionz" onClick={() => this.setState({ showModal: true })}>Instructions</button>
            </div>

          </div>
        </section>

        <section className="toFade" id="token-page">

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
                Each game you win will give you one token. Once you have worked hard to earn your tokens... sit back, relax, and spend them on some rewards! Each reward will cost you 1 token.
                    </p>
            </Modal.Body>
          </Modal>

          <PastRewards />

          <div id="token-button-div">
            <div className="button-tag">
              <button onClick={this.handleClickQuote} id="token-button-quote">QUOTE</button>
              <h5>Cost: 1 Token</h5>
            </div>

            <div className="button-tag">
              <button onClick={this.handleClickImage} id="token-button-image">PUPPY</button>
              <h5>Cost: 1 Token</h5>
            </div>
          </div>

          <div id="reward-boxes">

            {this.state.rewardQuote.quote ? <div id="reward-quote">
              <h3>"{this.state.rewardQuote.quote}"</h3>
              <h5>-{this.state.rewardQuote.author}</h5>
            </div> : null}

            {this.state.rewardImage ? <div id="reward-image">
            <img src={this.state.rewardImage} alt="your dog reward!" />
            </div> : null}

          </div>

        </section>
      </>
    )
  }
}

export default withAuth0(Token);
