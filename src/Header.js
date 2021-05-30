import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
// import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          {/* WE WILL CHANGE THESE ONCE HOMEPAGE IS POPULATED WITH IMAGES LATER */}
          <Link to="/">Homepage</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/pokemon">Pokemon</Link>
          <Link to="/knowledge">Knowledge</Link>
          {this.props.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar>

      </div>
    );
  }
}

export default Header;
