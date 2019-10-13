// @flow
import React from 'react';
import Square from '../Square/Square.jsx';

type Props = {
  winLine: Array<number>,
  squares: Array<string>,
  onClick: Function
};

type State = {
  boardSize: number;
};

class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      boardSize: 9,
    };
  }

  isWinSquare(squareNumber: number) {
    const { winLine } = this.props;
    if (winLine && winLine.includes(squareNumber)) {
      return true;
    }

    return false;
  }

  renderSquare(squareNumber: number) {
    const { squares } = this.props;
    const { onClick } = this.props;

    return (
      <Square
        value={squares[squareNumber]}
        onClick={() => onClick(squareNumber)}
        winSquare={this.isWinSquare(squareNumber)}
        key={squareNumber}
      />
    );
  }

  render() {
    // eslint-disable-next-line prefer-const
    let squares = Array(9);
    const { boardSize } = this.state;

    for (let i = 0; i < boardSize; i += 1) {
      squares[i] = this.renderSquare(i);
    }

    return (
      <div className="board-wrapper">
        <div className="game-board">{squares}</div>
      </div>
    );
  }
}

export default Board;
