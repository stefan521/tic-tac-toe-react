import React from 'react';

class Summary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ascending: false,
    }
  }

  getPlaySummary(move, index) {
    if(move.player === null) {
      return "go to game start";
    }

    let summary = "go to move " + move.player + " at ";
    let x = move.square % 3;
    let y = Math.floor(move.square / 3);
    // the origin of the xy axis is top left, not bottom left
    y = 2 - y;
    let coordinates = "(" + x + ", " + y + ")"
    return (summary + coordinates);
  }

  getMoveAtIndex(index) {
    if(this.state.descending) {
      return index;
    } else {
      let reversedIndex = this.props.moves.length - index - 1;
      return reversedIndex;
    }
  }

  getMoves() {
    const descending = this.state.descending;
    const moves = descending ? this.props.moves : this.props.moves.slice().reverse();
    // make a li for each move
    return moves.map((move, index) => {
      const summary = this.getPlaySummary(move, index);
        return (
          <li key={index}>
            <button
              onClick={() => this.props.onClick(this.getMoveAtIndex(index))}
              style={(this.getMoveAtIndex(index) === this.props.stepNumber) ?
                 {fontWeight: "bold"} : {fontWeight: "normal"}}
            >
              {summary}
            </button>
          </li>
        );
    });
  }

  reverseMoves() {
    this.setState({
      descending: !this.state.descending
    });
  }

  render() {
    return(
      <div>
        <button onClick={() => this.reverseMoves()}>
          {"view moves " + (this.state.descending ? "descending" : "ascending")}
        </button>
        <ol reversed={!this.state.descending}>
          {this.getMoves()}
        </ol>
      </div>
    );
  }
}

export default Summary;
