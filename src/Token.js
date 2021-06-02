import React from 'react';
import axios from 'axios';
import Background from './Background.js'
import './css/Token.css';
import { withAuth0 } from '@auth0/auth0-react';



class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: null,
      reward: '',
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


getReward = () => {


    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',

          // server team will let us know what path to use
          url: `/updateUser`
        }
        axios(requestConfig)
          .then(response => {

            console.log(response.data);

            let rewardString = response.data;

            console.log(rewardString);

            this.setState({ reward: rewardString });

            if(this.state.tokens > 0){
              this.setState({ tokens: this.state.tokens - 1 });
            }         
          })
          .catch(err => console.error(err));
      })


  // when user clicks button, subtract 1 number of tokens 

}

handleClick = async () => {

  await this.getReward();

}



  render() {
    return (
      <>
        <Background />
        <section className="toFade" id="token-page">

          <div id="initial-tokens>">
            <h3>{this.state.tokens}</h3>
          </div>

          <div id="reward">
            <h3>{this.state.reward}</h3>
          </div>

          <button onClick={this.handleClick} id="token-button">GET REWARD</button>

        </section>
      </>
    )
  }
}

export default withAuth0(Token);
