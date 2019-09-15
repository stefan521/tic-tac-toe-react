// @flow
/* eslint-disable class-methods-use-this */
import React from 'react';

type Move = {
  player: string,
  square: number
};

type Props = {
  moves: Array<Move>,
  onClick: Function,
  stepNumber: number
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
    const { stepNumber } = this.props;

    const orderedMoves = descending ? moves : moves.slice().reverse();

    const movesList = orderedMoves.map<any>((move: Move, index: number) => {
      const summary = this.getPlaySummary(move);
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <button
            type="button"
            onClick={() => onClick(this.getMoveAtIndex(index))}
            style={(this.getMoveAtIndex(index) === stepNumber)
              ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
          >
            {summary}
          </button>
        </li>
      );
    });

    return movesList;
  }

  reverseMoves() {
    const { descending } = this.state;

    this.setState({
      descending: !descending,
    });
  }

  render() {
    const { descending } = this.state;

    return (
      <div>
        <button
          type="button"
          onClick={() => this.reverseMoves()}
        >
          { `view moves ${descending ? 'descending' : 'ascending'}` }
        </button>
        <ol reversed={!descending}>
          {this.getMoves()}
        </ol>
      </div>
    );
  }
}

export default Summary;
