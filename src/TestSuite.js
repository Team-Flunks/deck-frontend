//===============Importing and setting up===============
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';

//===============Class and State Setup===============
class TestSuite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: '',
      didWin: 1,
      score: 0
    }
  }


//===============Request Functions Area===============
  singleUserFetch = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/singleUser/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Single User Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }


  allUsersFetch = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/allUsers/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client All User Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }


  userRecordUpdate = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/updateUser/?game=${this.state.game}
                                  &didWin=${this.state.didWin}
                                  &score=${this.state.score}`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Update User Data Response');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }

  //Set State Functions
  newGame = (e) => {this.setState({game: e.target.value})};
  newdidWin= (e) => {this.setState({didWin: e.target.value})};
  newScore = (e) => {this.setState({score: e.target.value})};


  knowledgeInfoFetch = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/knowledgegame/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Knowledge Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }


  pokeInfoFetch = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/pokeInfo/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Poke Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }

  rewardFetchQuote = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/rewardRequestQuote/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Reward Quote Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }

  rewardFetchImage = () => {
    //Assumes that the user is tied to the auth0 email
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/rewardRequestImage/`
        }
        axios(requestConfig)
          .then(response => {
            console.log('Client Reward Image Data In');     
            console.log(response);
          })
          .catch(err => console.error(err));
      })
  }

//===============Button Render Area===============

  render() {
    return (
      <>
        <button onClick={this.singleUserFetch}>Single User Data Pull</button>
        <button onClick={this.allUsersFetch}>All Users Data Pull</button>
        <button onClick={this.knowledgeInfoFetch}>Knowledge Info Pull</button>
        <button onClick={this.pokeInfoFetch}>Poke Info Pull</button>
        <button onClick={this.rewardFetchQuote}>Reward Quote Request</button>
        <button onClick={this.rewardFetchImage}>Reward Image Request</button>
        <Form.Group>
          <Form.Label>Test Game Record Info</Form.Label>
          <Form.Control placeholder="game" onChange={this.newGame} ></Form.Control>
          <Form.Control placeholder="didWin" onChange={this.newdidWin}></Form.Control>
          <Form.Control placeholder="score" onChange={this.newScore}></Form.Control>
          <Button variant="outline-info" onClick={this.userRecordUpdate}>Update User Data w/ this Info</Button>
        </Form.Group>
      </>
    )
  }



}

export default withAuth0(TestSuite);