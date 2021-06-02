import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton.js';
import LoginButton from './LoginButton.js';
import { withAuth0 } from '@auth0/auth0-react';
import './css/Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar className="HeaderClass">
        <h1>Project Arcade</h1>
        {this.props.auth0.isAuthenticated
          ? <>
            <Link to="/home">Homepage</Link>
            <Link to="/token">Redeem Prizes!</Link>
            <Link to="/profile">Profile</Link>
          </>
          : null}
        <Link to="/AboutUs">About Us</Link>
        <LogoutButton />
        <LoginButton />
      </Navbar>
    );
  }
}

export default withAuth0(Header);
