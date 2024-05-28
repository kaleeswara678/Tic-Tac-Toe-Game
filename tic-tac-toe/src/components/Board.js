import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Board.css';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [runner, setRunner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const newWinner = calculateWinner(squares);
    if (newWinner) {
      setWinner(newWinner);
      setRunner(xIsNext ? 'O' : 'X');
    } else if (squares.every(square => square !== null)) {
      setIsDraw(true);
    }
  }, [squares, xIsNext]);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setRunner(null);
    setIsDraw(false);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}, Runner-up: ${runner}`;
  } else if (isDraw) {
    status = 'The game is a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  useEffect(() => {
    if (winner || isDraw) {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000); // Refresh the game after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [winner, isDraw]);

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
      <div className="status">
        {winner || isDraw ? (
          <div className="winner-runner">
            <div className="winner">{status}</div>
          </div>
        ) : (
          <div>{status}</div>
        )}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
