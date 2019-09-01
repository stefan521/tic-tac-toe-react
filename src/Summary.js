import React from 'react';

export default class Summary extends React.Component {

  getMoves() {
    const moves = this.props.history.map((step, move) => {
      const desc = move ? 'go to move ' + move : 'go to game start';
        return (
          <li key={move}>
            <button
              onClick={() => this.props.onClick(move)}
              style={(move === this.props.stepNumber) ? {fontWeight: 'bold'} :
                     {fontWeight: 'normal'}}
            >
              {desc}
            </button>
          </li>
        );
    });

    return moves;
  }

  render() {
    return(
      <div>
        <ol>{this.getMoves()}</ol>
      </div>
    );
  }
}
