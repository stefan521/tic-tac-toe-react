import React from 'react';

export default class Summary extends React.Component {

  getPlaySummary(move, index) {
    if(index === 0) {
      return "go to game start";
    }

    let summary = "go to move " + move.player + " at ";
    let x = move.square % 3;
    let y = Math.floor(move.square / 3);
    //the origin of the xy axis is top left, not bottom left
    y = 2 - y;
    let coordinates = "(" + x + ", " + y + ")"
    return (summary + coordinates);
  }

  getMoves() {
    const moves = this.props.moves.map((move, index) => {
      const desc = this.getPlaySummary(move,index);
        return (
          <li key={index}>
            <button
              onClick={() => this.props.onClick(index)}
              style={(index === this.props.stepNumber) ? {fontWeight: "bold"} :
                     {fontWeight: "normal"}}
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
