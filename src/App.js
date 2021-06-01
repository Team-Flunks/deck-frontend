import './css/App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import IsLoadingAndError from './IsLoadingAndError';
import Header from './Header.js';
import HomePage from './HomePage.js';
import Profile from './Profile.js';
import Knowledge from './Knowledge.js';
import Pokemon from './Pokemon.js';
import AboutUs from './AboutUs.js';
import EnterPage from './EnterPage.js';
import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { TranitionGroup, CSSTransition } from 'react-transition-group';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <IsLoadingAndError>
            {/* KEIAN I added a route for the home page which is home- and changed the / route for when someone first visits the page- they will see our enter screen! Feel free to change it back if you don't like it or if it messes up other things. I didn't spend a whole bunch of time on it. */}
            <Header />
            <Route exact path="/">
              <EnterPage />
            </Route>
            <Route exact path="/home">
              {this.props.auth0.isAuthenticated
                ? <HomePage />
                : null}
            </Route>
            <Route exact path="/profile">
              {this.props.auth0.isAuthenticated
                ? <Profile />
                : null}
            </Route>
            <Route exact path="/knowledge">
              {this.props.auth0.isAuthenticated
                ? <Knowledge />
                : null}
            </Route>
            <Route exact path="/pokemon">
              {this.props.auth0.isAuthenticated
                ? <Pokemon />
                : null}
            </Route>
            <Route exact path="/AboutUs">
              {this.props.auth0.isAuthenticated
                ? <AboutUs />
                : null}
            </Route>
          </IsLoadingAndError>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);
