import React from 'react';
import axios from 'axios';
import '../css/Token.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Modal, ListGroup } from 'react-bootstrap';



class PastQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastRewardQuotes: [],
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  //Get past high scores for current user
  getUserData = () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3002',
          url: `/singleUser`
        }
        axios(requestConfig)
          .then(response => {

            console.log(response.data);

            let rewardQuotes = response.data.rewardQuotes


            this.setState({ pastRewardQuotes: rewardQuotes })

            console.log(this.state.pastRewardQuotes[0]);

          })
          .catch(err => console.error(err));
      })
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.showQuoteModal}
          onHide={() => this.props.callback()}
          id="quote-modal"
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="quote-modal-title">
              Your Past Quote Rewards
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.pastRewardQuotes.map((quote, idx) => {
                return <ListGroup.Item id={idx} className="quote">
                  <h4>"{quote.quote}"</h4>
                  <h5>-{quote.author}</h5>
                </ListGroup.Item>
              })}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default withAuth0(PastQuotes);
