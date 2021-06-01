/* eslint-disable */
import React from 'react';
import KeianImage from './TeamPics/KeianSquare.jpg';
import ChazImage from './TeamPics/ItsChazSquare.jpg';
import QuentinImage from './TeamPics/QuentinSquare.jpg';
import PeytonImage from './TeamPics/PeytonSquare.png';
import './css/AboutUs.css';
import Background from './Background.js'


class AboutUs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
      <Background />
      <div className="AboutUs toFade">
        <h1>Welcome to our About Us!</h1>
        <h2>Our team:</h2>
        <div className="Keian">
          <h3>Keian Anthony</h3>
          <img src={KeianImage} alt="Picture of Keian" />
          <h4>Software developer focusing on logic and algorithms used within both front-end and back-end applications. Other interests include skiing, cooking, and gaming.</h4>
        </div>
        <div className="Peyton">
          <h3>Peyton Mader</h3>
          <img src={PeytonImage} alt="Picture of Peyton" />
          <h4>Software developer and musician focused on the intersection of art and technology. Other interests include cello and guitar, possums, dark chocolate, and crabbing.</h4>
        </div>
        <div className="Charles">
          <h3>Charles Bofferding</h3>
          <img src={ChazImage} alt="Picture of Charles" />
          <h4>Developer of Software, lover of dogs, hiker of mountains, writer of run on sentences, user of the oxford comma and complete truth teller. My technical focus is in back-end development and finding efficient solutions to complicated problems</h4>
        </div>
        <div className="Quentin">
          <h3>Quentin Cruz</h3>
          <img src={QuentinImage} alt="Picture of Quentin" />
          <h4>Software developer with an emphasis in JavaScript focusing on using technology to increase productivity in healthcare. Other interests include cooking, hiking, singing, and playing golf.</h4>

        </div>
      </div>
      </>
    )
  }
}

export default AboutUs;
