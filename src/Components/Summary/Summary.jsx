// @flow
/* eslint-disable class-methods-use-this */
import React from 'react';
import Status from '../Status/Status.jsx';

type Move = {
  player: string,
  square: number
};

type Props = {
  moves: Array<Move>,
  onClick: Function,
  stepNumber: number,
  xIsNext: boolean,
  status: {
    gameEnded: boolean,
    winner: string,
    line: Array<any>
  }
};

type State = {
  descending: boolean
};

class Summary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      descending: true,
    };
  }

  getPlaySummary(move: Move) {
    if (move.player === null) {
      return 'go to game start';
    }

    const summary = `go to move ${move.player} at `;
    const x = move.square % 3;
    let y = Math.floor(move.square / 3);
    // the origin of the xy axis is top left, not bottom left
    y = 2 - y;
    const coordinates = `(${x}, ${y})`;
    return (summary + coordinates);
  }

  getMoveAtIndex(index: number) {
    const { descending } = this.state;
    const { moves } = this.props;

    if (descending) {
      return index;
    }

    const reversedIndex = moves.length - index - 1;
    return reversedIndex;
  }

  getMoves() {
    const { descending } = this.state;
    const { moves } = this.props;
    const { onClick } = this.props;

    const orderedMoves = descending ? moves : moves.slice().reverse();

    const movesList = orderedMoves.map<any>((move: Move, index: number) => {
      const summary = this.getPlaySummary(move);

      return (
        <button
          key={move.square}
          type="button"
          onClick={() => onClick(this.getMoveAtIndex(index))}
          className={this.checkCurrentMove(index)}
        >
          {summary}
        </button>
      );
    });

    return movesList;
  }

  checkCurrentMove(index: number) {
    const { stepNumber } = this.props;

    if (this.getMoveAtIndex(index) === stepNumber) {
      return 'btn-current-move';
    }

    return 'btn-history';
  }

  reverseMoves() {
    const { descending } = this.state;

    this.setState({
      descending: !descending,
    });
  }

  render() {
    const { descending } = this.state;
    const { xIsNext } = this.props;
    const { status } = this.props;

    return (
      <div className="game-info">
        <div className="next-player">
          <Status
            xIsNext={xIsNext}
            status={status}
          />
        </div>
        <div className="history">
          <button
            type="button"
            id="button-reverse"
            onClick={() => this.reverseMoves()}
          >
            { `view moves ${descending ? 'descending' : 'ascending'}` }
          </button>
          {this.getMoves()}
        </div>
      </div>
    );
  }
}

export default Summary;
