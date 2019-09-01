import React from 'react';
import Board from './Board.js';
import Summary from './Summary.js';
import Status from './Status.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      moves: [{
        player: null,
        square: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(squareNumber) {
    // first object in the history is the initial empty board as an array
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // the first move when the board is empty is null, null too
    const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const player = this.state.xIsNext ? 'X' : 'O';

    if (calculateWinner(squares) || squares[squareNumber]) {
      return;
    }

    squares[squareNumber] = player;

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      moves: moves.concat({player: player, square: squareNumber}),
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

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(square) => this.handleClick(square)}
          />
        </div>
        <div className="game-info">
          <Status
            xIsNext={this.state.xIsNext}
            winner={winner}
          />
          <Summary
            moves={this.state.moves}
            stepNumber={this.state.stepNumber}
            onClick={(step) => this.jumpTo(step)}
          />
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
