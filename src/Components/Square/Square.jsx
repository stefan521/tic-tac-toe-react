// @flow
import React from 'react';

type Props = {
  onClick: Function,
  winSquare: boolean,
  value: string
};

export default function Square(props: Props) {
  const { onClick } = props;
  const { winSquare } = props;
  const { value } = props;

  function pickClass() {
    if (winSquare === true && value === 'X') {
      return 'win-x square';
    }

    if (winSquare === true && value === 'O') {
      return 'win-o square';
    }

    return 'square';
  }

  return (
    <div className="grid-item">
      <button
        type="button"
        onClick={onClick}
        className={pickClass()}
      >
        {value}
      </button>
    </div>
  );
}
