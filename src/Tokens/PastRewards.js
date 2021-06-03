import React from 'react';
import axios from 'axios';
import '../css/Rewards.css';
import { withAuth0 } from '@auth0/auth0-react';
import PastImages from './PastImages.js'
import PastQuotes from './PastQuotes.js'




class PastRewards extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tokens: 0,
      showPastImage: false,
      showPastQuote: false,

    }
  }

  handlePastImage = () => {
    this.setState({showPastImage: true})
  }

  closePastImage = () => {
    this.setState({showPastImage: false})
  }

  handlePastQuote = () => {
    this.setState({showPastQuote: true})
  }

  closePastQuote = () => {
    this.setState({showPastQuote: false})
  }


  render() {
    return (
      <>

      <div id="token-button-past">
      <button onClick={this.handlePastQuote} id="show-past-quotes">Past Quote Rewards</button>

      <button onClick={this.handlePastImage} id="show-past-images">Past Puppy Rewards</button>

      {this.state.showPastImage ? <PastImages showImageModal={this.state.showPastImage} callback={this.closePastImage}/> : null}

      {this.state.showPastQuote ? <PastQuotes showQuoteModal={this.state.showPastQuote} callback={this.closePastQuote}/> : null} 

      </div>
      </>
    )
  }
}

export default withAuth0(PastRewards);
