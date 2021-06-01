/* eslint-disable */
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import './css/Profile.css';
import Background from './Background.js'


class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Background />
        <div className="profileData toFade">
          <h1>My Profile</h1>
          <h2>Username: {this.props.auth0.user.nickname}</h2>
          <img src={this.props.auth0.user.picture} alt="User Picture" />
          <h3>Email: {this.props.auth0.user.email}</h3>
        </div>
      </>
    )
  }
}

export default withAuth0(Profile);
