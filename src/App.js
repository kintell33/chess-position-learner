import { useEffect, useState } from "react";
import "./App.css";
import ChessBoard from "./Components/ChessBoard";

function App() {
  const [randomlySelectedPosition, setRandomlySelectedPosition] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);

  useEffect(() => {
    generateRandomPosition();
  }, []);

  function getChessboardPosition(row, col) {
    const columnLabel = String.fromCharCode(65 + col);
    const rowLabel = 8 - row;
    return `${columnLabel}${rowLabel}`;
  }

  function clearSelectedPositions() {
    setSelectedPositions([]);
    generateRandomPosition();
  }

  const generateRandomPosition = (selected) => {
    if (selected) {
      let oldSelectedPositions = selectedPositions;
      oldSelectedPositions.push(selected);
      setSelectedPositions(oldSelectedPositions);
    }

    const randomRow = Math.floor(Math.random() * 8);
    const randomCol = Math.floor(Math.random() * 8);
    setRandomlySelectedPosition(getChessboardPosition(randomRow, randomCol));
  };

  return (
    <div className="App">
      This is a game for learn the squares from the white position.
      <div style={{display: 'flex', gap: '20px'}}>
        <ChessBoard
          nextSquare={generateRandomPosition}
          square={randomlySelectedPosition}
          restart={clearSelectedPositions}
        ></ChessBoard>
        <div style={{marginTop: '15px'}}>
          <div>Correct selected positions: {selectedPositions.length}</div>
          <br></br>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {selectedPositions.map((item) => {
              return (
                <>
                  {item}
                  <br></br>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
