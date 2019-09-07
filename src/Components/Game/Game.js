import React from 'react';
import Board from '../Board/Board.js';
import Summary from '../Summary/Summary.js';
import Status from '../Status/Status.js';
import { getGameStatus } from './helper.js';

class Game extends React.Component {
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

    if (getGameStatus(squares).gameEnded || squares[squareNumber]) {
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
    const status = getGameStatus(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(square) => this.handleClick(square)}
            winLine ={status.line}
          />
        </div>
        <div className="game-info">
          <Status
            xIsNext={this.state.xIsNext}
            status={status}
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

export default Game;
