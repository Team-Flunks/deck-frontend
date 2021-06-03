import React from 'react';
import axios from 'axios';
import '../css/Token.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Modal, Carousel } from 'react-bootstrap';



class PastImages extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        pastRewardQuotes: [],
        pastRewardImages: [],
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
  
              let rewardImages = response.data.rewardImages
  
  
              this.setState({ pastRewardImages: rewardImages })
              
              console.log(this.state.pastRewardImages[0]);
  
            })
            .catch(err => console.error(err));
        })
    }

  render() {
    return (
      <>
        <Modal
          show={this.props.showImageModal}
          onHide={() => this.props.callback()}
          id="image-modal"
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="item-modal-title">
              Your Past Image Rewards
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
            {this.state.pastRewardImages.map((image, idx) => {
            return <Carousel.Item className="image">
              <img
                className="d-block w-100"
                src={image.imageSrc}
                alt={`Your puppy reward'`}
              />
            </Carousel.Item>
          })}
            </Carousel>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default withAuth0(PastImages);
