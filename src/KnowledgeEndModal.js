/* eslint-disable */
import React from 'react';
import './css/Knowledge.css';
import { Modal, Button} from 'react-bootstrap';


class KnowledgeEndModal extends React.Component {
  constructor(props) {
    super(props);
    }

  // 0 is truth, 1 is lie
  handleClick = (e) => {
    this.setState({ selectedButton: e });
    this.testAnswer();
  }

  handleEnd = () => {
    this.setState({showEndModal: true});
  }

  render() {
    return (
      <>
            <Modal
              show={this.props.showEndModal}
              onHide={() => this.props.callback(false)}
              id="end-modal"
              backdrop= 'static'
            >
              <Modal.Header closeButton>
                <Modal.Title id="end-modal-title">
                  GAME OVER
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                Thanks for playing! You {this.props.score >= 8 ? "did" : "did not"} get a token! <br></br><br></br>Want to play again? Just X out of this screen and start clicking away. Or, return to the home screen to play one of our other games.
                  </p>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button onClick={() => this.props.callback(false)} id="close">Close</Button>
              </Modal.Footer> */}
            </Modal>
      </>
    )
  }
}

export default KnowledgeEndModal;
