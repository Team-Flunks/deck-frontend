/* eslint-disable */
import React from 'react';
import KeianImage from './TeamPics/KeianSquare.jpg';
import ChazImage from './TeamPics/ItsChazSquare.jpg';
import QuentinImage from './TeamPics/QuentinSquare.jpg';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="AboutUs">
        <h1>Welcome to our About Us!</h1>
        <h2>Our team:</h2>
        <div className="Keian">
          <h3>Keian Anthony</h3>
          <img src={KeianImage} alt="Picture of Keian" />
          <h4>Software developer focusing on logic and algorithms used within both front-end and back-end applications. Other interests include skiing, cooking, and gaming.</h4>
        </div>
        <div className="Peyton">
          <h3>Peyton Mader</h3>
          <img src="" alt="Picture of Peyton" />
          <h4>Short description of self-interests & experience / strengths, etc.</h4>
        </div>
        <div className="Charles">
          <h3>Charles Bofferding</h3>
          <img src={ChazImage} alt="Picture of Charles" />
          <h4>Short description of self-interests & experience / strengths, etc.</h4>
        </div>
        <div className="Quentin">
          <h3>Quentin Cruz</h3>
          <img src={QuentinImage} alt="Picture of Quentin" />
          <h4>Short description of self-interests & experience / strengths, etc.</h4>
        </div>
      </div>
    )
  }
}

export default AboutUs;
