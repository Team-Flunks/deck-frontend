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
      areWeTesting: true,
      game: '',
      timesPlayed: 0,
      timesWon: 0,
      timesLost: 0,
      highscore: 0
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
                                  &timesPlayed=${this.state.timesPlayed}
                                  &timesWon=${this.state.timesWon}
                                  &timesLost=${this.state.timesLost}
                                  &highscore=${this.state.highscore}`
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
  newTimesPlayed = (e) => {this.setState({timesPlayed: e.target.value})};
  newTimesWon = (e) => {this.setState({timesWon: e.target.value})};
  newTimesLost = (e) => {this.setState({timesLost: e.target.value})};
  newHighscore = (e) => {this.setState({highscore: e.target.value})};

//===============Button Render Area===============

    // game: {type: String, required: true},
    // timesPlayed: {type: Number},
    // timesWon: {type: Number},
    // timesLost: {type: Number},
    // highscore:{type: Number}

  render() {
    return (
      <>
        <button onClick={this.singleUserFetch}>Single User Data Pull</button>
        <button onClick={this.allUsersFetch}>All Users Data Pull</button>
        <Form.Group>
          <Form.Label>Test Game Record Info</Form.Label>
          <Form.Control placeholder="game" onChange={this.newGame} ></Form.Control>
          <Form.Control placeholder="timesPlayed" onChange={this.newTimesPlayed}></Form.Control>
          <Form.Control placeholder="timesWon" onChange={this.newTimesWon}></Form.Control>
          <Form.Control placeholder="timesLost" onChange={this.newTimesLost}></Form.Control>
          <Form.Control placeholder="highscore" onChange={this.newHighscore}></Form.Control>
          <Button variant="outline-info" onClick={this.userRecordUpdate}>Update User Data w/ this Info</Button>
        </Form.Group>
      </>
    )
  }



}

export default withAuth0(TestSuite);