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

  return (
    <div className="grid-item">
      <button
        type="button"
        className={winSquare ? 'win-square square' : 'square'}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}
