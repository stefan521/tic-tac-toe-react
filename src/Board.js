import React from 'react';
import Square from './Square.js';

class Board extends React.Component {
  renderSquare(squareNumber) {
    return (
       <Square
          value={this.props.squares[squareNumber]}
          onClick={() => this.props.onClick(squareNumber)}
          key={squareNumber}
       />
    );
  }

  render() {
    let rows = [];
    let boardSize = 3;

    for(let i = 0; i < boardSize; i++) {
      let row = [];
      for(let j = 0; j < boardSize; j++) {
        let squareNumber = i * boardSize + j;
        row.push(this.renderSquare(squareNumber));
      }
      rows.push(<div className="board-row" key={i}>{row}</div>);
    }

    return (<div>{rows}</div>);
  }
}

export default Board;
