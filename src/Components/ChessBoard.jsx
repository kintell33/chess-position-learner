import React, { useRef, useState } from "react";
import "./styles.css";

const useChessBoardRefs = () => {
  const squareRefs = useRef(
    Array.from({ length: 8 }, () => Array(8).fill(null))
  );
  return squareRefs.current;
};

const ChessBoard = ({ square, nextSquare, restart }) => {
  const squareRefs = useChessBoardRefs();
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSquareClick = (row, col) => {
    const selected = `${String.fromCharCode(65 + col)}${8 - row}`;
    setSelectedPosition(selected);

    if (square === selected) {
      nextSquare(selected);
    } else {
      restart();
    }
  };

  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isEvenSquare = (row + col) % 2 === 0;
        const squareColor = isEvenSquare ? "light" : "dark";
        squares.push(
          <div
            key={`${row}-${col}`}
            ref={(el) => (squareRefs[row][col] = el)}
            className={`chess-square ${squareColor}`}
            onClick={() => handleSquareClick(row, col)}
          ></div>
        );
      }
    }
    return squares;
  };

  return (
    <div className="chess-container">
      <div className="info-panel">
        <p>
          Please select this: <b>{square}</b>
        </p>
        <p>
          Selected Position: <b>{selectedPosition}</b>
        </p>
      </div>
      <div className="chess-board">{renderSquares()}</div>
    </div>
  );
};

export default ChessBoard;
