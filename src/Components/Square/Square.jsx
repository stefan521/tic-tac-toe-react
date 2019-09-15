// @flow
import React from 'react';

type Props = {
  onClick: Function,
  color: string,
  value: string
};

export default function Square(props: Props) {
  const { onClick } = props;
  const { color } = props;
  const { value } = props;

  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      style={{ background: color }}
    >
      {value}
    </button>
  );
}
