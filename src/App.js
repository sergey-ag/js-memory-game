import { useState } from 'react';
import Card from 'react-free-playing-cards/lib/TcN';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import getMemoDeck from './deck';
import WinModal from './WinModal';

const memo = getMemoDeck();

const start = Math.floor((new Date()).getTime() / 1000);

function Grid(props) {
  const [isFlipped, setIsFlipped] = useState(new Array(memo.length)
    .fill("")
    .map(() => new Array(memo[0].length).fill(false))
  );

  const [lastFlipped, setLastFlipped] = useState();

  const handleCardClicked = (row, column) => {
    
    const hasWon = () => {
      return isFlipped.flat().every((element) => element);
    };
    
    const newIsFlipped = [...isFlipped];
    if (!newIsFlipped[row][column]) {
      props.incrementClickCount();
      const cardClicked = {
        rank: memo[row][column],
        row,
        column
      };
      newIsFlipped[cardClicked.row][cardClicked.column] = true;
      setIsFlipped([...newIsFlipped]);

      if (lastFlipped) {
        if (cardClicked.rank !== lastFlipped.rank) {
          setTimeout(() => {
            newIsFlipped[cardClicked.row][cardClicked.column] = false;
            newIsFlipped[lastFlipped.row][lastFlipped.column] = false;
            setIsFlipped([...newIsFlipped]);
          }, 500);
        } else {
          if (hasWon()) {
            props.calcPoints();
            props.handleShowWinModal();
          }
        }
        setLastFlipped(undefined);
      } else {
        setLastFlipped(cardClicked);
      }
    }
  };

  return (
    <Container className="mt-3">
      {memo.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-2">
          {row.map((rank, colIndex) => (
            <Col key={colIndex}>
              <div className="memo-card" onClick={() => handleCardClicked(rowIndex, colIndex)}>
                <Card card={rank} height="150px" back={!isFlipped[rowIndex][colIndex]} />
              </div>
            </Col>
         ))}
        </Row>
      ))}
    </Container>
  );
}

function App() {
  const [clickCount, setClickCount] = useState(0);
  
  const [timer, setTimer] = useState(0);

  const [showWinModal, setShowWinModal] = useState(false);

  const [points, setPoints] = useState(0);

  const incrementClickCount = () => {
    setClickCount((currentValue) => currentValue + 1);
  };

  setInterval(() => {
    setTimer(Math.floor((new Date()).getTime() / 1000) - start);
  }, 1000);

  const handleShowWinModal = () => setShowWinModal(true);

  const calcPoints = () => {
    const pts = 1000 - clickCount - timer;
    setPoints(pts);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Memory Game
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Clicks: {clickCount} &mdash; Time: {timer}s</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Grid incrementClickCount={incrementClickCount} handleShowWinModal={handleShowWinModal} calcPoints={calcPoints} />
      <WinModal show={showWinModal} points={points} />
    </>
  );
}

export default App;
