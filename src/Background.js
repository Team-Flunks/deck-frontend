/* eslint-disable */
import React from 'react';
import './css/Background.css';


class Background extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <video autoPlay muted loop id="background-vid">
          <source src='https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.mp4' type="video/mp4"/>
        </video>
    )
  }
}

export default Background;
