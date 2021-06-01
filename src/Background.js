/* eslint-disable */
import React from 'react';
import './css/Background.css';
import vid from "./gif1.mp4"


class Background extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <video autoPlay muted loop id="background-vid">
          <source src={vid} type="video/mp4"/>
        </video>
    )
  }
}

export default Background;
