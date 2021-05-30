/* eslint-disable */
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>You are on the Profile page</h1>
        <div className="profileData">
          <h2>Username: {this.props.auth0.user.nickname}</h2>
          <img src={this.props.auth0.user.picture} alt="User Picture" />
          <h3>Email: {this.props.auth0.user.email}</h3>
        </div>
      </>
    )
  }
}

export default withAuth0(Profile);
