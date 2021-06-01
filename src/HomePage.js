/* eslint-disable */
import React from 'react';
import Background from './Background.js';
import './css/HomePage.css';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Background />
        <section className="toFade" id="home-page">
          <h1>You are on the Home page</h1>
        </section>
      </>
    )
  }
}

export default HomePage;
