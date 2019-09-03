export function getGameStatus(squares) {
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

  let winner = checkWinner(lines, squares);
  if(winner) {
    return winner;
  }

  let draw = checkDraw(lines, squares);
  if(draw) {
    return draw;
  }

  return {
    gameEnded: false,
    winner: null,
    line: null,
  };
}

function checkWinner(lines, squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        gameEnded: true,
        winner: squares[a],
        line: lines[i],
      };
    }
  }
}

function checkDraw(lines, squares) {
  if(!squares.includes(null)) {
    return {
      gameEnded: true,
      winner: null,
      line: null,
    };
  }
}
