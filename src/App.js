import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import IsLoadingAndError from './IsLoadingAndError';
import Header from './Header.js';
import HomePage from './HomePage.js';
import Profile from './Profile.js';
import Knowledge from './Knowledge.js';
import Pokemon from './Pokemon.js';
import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <IsLoadingAndError>
            {/* Need to make Header component */}
            <Header />
            <Route exact path="/">
              {this.props.auth0.isAuthenticated
                // Need to make HomePage component
                ? <HomePage />
                : null}
            </Route>
            <Route exact path="/profile">
              {this.props.auth0.isAuthenticated
                // Need to make Profile component
                ? <Profile />
                : null}
            </Route>
            <Route exact path="/knowledge">
              {this.props.auth0.isAuthenticated
                // Need to make Knowledge component
                ? <Knowledge />
                : null}
            </Route>
            <Route exact path="/pokemon">
              {this.props.auth0.isAuthenticated
                // Need to make Pokemon component
                ? <Pokemon />
                : null}
            </Route>
          </IsLoadingAndError>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);
