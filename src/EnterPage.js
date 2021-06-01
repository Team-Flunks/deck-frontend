/* eslint-disable */
import React from 'react';
import { Link } from "react-router-dom";
import './css/EnterPage.css';



class EnterPage extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <>
        <section className="toFade" id="enter-page">
          <div id="enter-div">
            <h1>Project Arcade</h1>
            <Link to="/home">enter the arcade</Link>
          </div>
        </section>
      </>
    )
  }
}

export default EnterPage;
