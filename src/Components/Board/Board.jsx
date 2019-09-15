// @flow
import React from 'react';
import Square from '../Square/Square.jsx';

type Props = {
  winLine: Array<number>,
  squares: Array<string>,
  onClick: Function
};

class Board extends React.Component<Props> {
  pickSquareColor(squareNumber: number) {
    const { winLine } = this.props;
    if (winLine && winLine.includes(squareNumber)) {
      return 'lightgreen';
    }

    return 'white';
  }

  renderSquare(squareNumber: number) {
    const { squares } = this.props;
    const { onClick } = this.props;

    return (
      <Square
        value={squares[squareNumber]}
        onClick={() => onClick(squareNumber)}
        color={this.pickSquareColor(squareNumber)}
        key={squareNumber}
      />
    );
  }

  render() {
    // eslint-disable-next-line prefer-const
    let rows = [];
    const boardSize = 3;

    for (let i = 0; i < boardSize; i += 1) {
      // eslint-disable-next-line prefer-const
      let row = [];
      for (let j = 0; j < boardSize; j += 1) {
        const squareNumber = i * boardSize + j;
        row.push(this.renderSquare(squareNumber));
      }
      rows.push(<div className="board-row" key={i}>{row}</div>);
    }

    return (<div>{rows}</div>);
  }
}

export default Board;
