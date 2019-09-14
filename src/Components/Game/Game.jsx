import React from 'react';
import Board from '../Board/Board';
import Summary from '../Summary/Summary';
import Status from '../Status/Status';
import { getGameStatus } from './helper';

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
    };
  }

  handleClick(squareNumber) {
    const { history } = this.state;
    const { stepNumber } = this.state;
    const { xIsNext } = this.state;
    const { moves } = this.state;

    // first object in the history is the initial empty board as an array
    const historyUntilStep = history.slice(0, stepNumber + 1);
    // the first move when the board is empty is null, null too
    const movesUntilStep = moves.slice(0, stepNumber + 1);
    const current = historyUntilStep[historyUntilStep.length - 1];
    const squares = current.squares.slice();
    const player = xIsNext ? 'X' : 'O';

    if (getGameStatus(squares).gameEnded || squares[squareNumber]) {
      return;
    }

    squares[squareNumber] = player;

    this.setState({
      history: historyUntilStep.concat([{
        squares,
      }]),
      moves: movesUntilStep.concat({ player, square: squareNumber }),
      stepNumber: historyUntilStep.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      xIsNext: (stepNumber % 2) === 0,
    });
  }

  render() {
    const { history } = this.state;
    const { stepNumber } = this.state;
    const { xIsNext } = this.state;
    const { moves } = this.state;

    const current = history[stepNumber];
    const status = getGameStatus(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(square) => this.handleClick(square)}
            winLine={status.line}
          />
        </div>
        <div className="game-info">
          <Status
            xIsNext={xIsNext}
            status={status}
          />
          <Summary
            moves={moves}
            stepNumber={stepNumber}
            onClick={(step) => this.jumpTo(step)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
