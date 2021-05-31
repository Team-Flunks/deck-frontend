import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton.js';
import LoginButton from './LoginButton.js';
import { withAuth0 } from '@auth0/auth0-react';
// import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Arcade</Navbar.Brand>
        {/* WE WILL CHANGE THESE ONCE HOMEPAGE IS POPULATED WITH IMAGES LATER */}
        {this.props.auth0.isAuthenticated
          ? <>
            <Link to="/">Homepage</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/knowledge">Knowledge Game</Link>
            <Link to="/pokemon">Pokemon Game</Link>
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
