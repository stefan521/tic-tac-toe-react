import React from 'react';
import Board from './Board.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        plays: Array(9).fill(""),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  getPlaySummary(squareNumber) {
    let player = this.state.xIsNext ? 'X' : 'O';
    let x = squareNumber % 3;
    let y = Math.floor(squareNumber / 3);
    //the origin of the xy axis is top left, not bottom left
    y = 2 - y;
    return player + " (" + x + ", " + y + ")";
  }

  handleClick(squareNumber) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const plays = current.plays.slice();
    if (calculateWinner(squares) || squares[squareNumber]) {
      return;
    }
    squares[squareNumber] = this.state.xIsNext ? 'X' : 'O';
    plays[this.state.stepNumber + 1] = this.getPlaySummary(squareNumber);
    this.setState({
      history: history.concat([{
        squares: squares,
        plays: plays,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      xIsNext: (stepNumber % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move ' + history[move].plays[move] : 'Go to game start';
        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
              style={(move === this.state.stepNumber) ? {fontWeight: 'bold'} :
                     {fontWeight: 'normal'}}
            >
              {desc}
            </button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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
