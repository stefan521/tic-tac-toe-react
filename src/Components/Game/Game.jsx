// @flow
import React from 'react';
import Board from '../Board/Board.jsx';
import Summary from '../Summary/Summary.jsx';
import { getGameStatus } from './helper';

type Props = any;

type State = {
  history: Array<any>,
  moves: Array<any>,
  stepNumber: number,
  xIsNext: boolean
};

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
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

  handleClick(squareNumber: number) {
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

  jumpTo(stepNumber: number) {
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
        <Board
          squares={current.squares}
          onClick={(square) => this.handleClick(square)}
          winLine={status.line}
        />
        <Summary
          moves={moves}
          stepNumber={stepNumber}
          onClick={(step) => this.jumpTo(step)}
          status={status}
          xIsNext={xIsNext}
        />
      </div>
    );
  }
}

export default Game;
