/* eslint-disable */
import React from 'react';
import Background from './Background.js';
import './css/HomePage.css';
import KnowledgePicture from './machines/KnowledgeMachine.png';
import PokemonPicture from './machines/PokemonMachine.png';
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Background />
        <section className="toFade" id="home-page">

          <div id="profile-lines-home">
          <div className="profile-divider"></div>
          <h1>Click a game to play!</h1>
          <div className="profile-divider"></div>
          </div>

          <div className="machines">
            <Link to="/knowledge" className="machine">
              <img src={KnowledgePicture} alt="Knowledge Game" />
            </Link>
            <Link to="/pokemon" className="machine">
              <img src={PokemonPicture} alt="Whose That Pokemon Game" />
            </Link>
          </div>
        </section>
      </>
    )
  }
}

export default HomePage;
