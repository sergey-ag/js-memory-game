import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WinModal(props) {

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>You win!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><span className="display-1">{props.points}</span> pts</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Play again!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WinModal;