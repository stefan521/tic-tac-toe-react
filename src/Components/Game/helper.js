function checkWinner(lines, squares) {
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        gameEnded: true,
        winner: squares[a],
        line: lines[i],
      };
    }
  }

  return null;
}

function isBoardFull(lines, squares) {
  if (!squares.includes(null)) {
    return {
      gameEnded: true,
      winner: null,
      line: null,
    };
  }

  return null;
}

function getGameStatus(squares) {
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

  const winner = checkWinner(lines, squares);
  if (winner) {
    return winner;
  }

  const draw = isBoardFull(lines, squares);
  if (draw) {
    return draw;
  }

  return {
    gameEnded: false,
    winner: null,
    line: null,
  };
}

// eslint-disable-next-line import/prefer-default-export
export { getGameStatus };
