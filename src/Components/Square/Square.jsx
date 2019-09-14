import React from 'react';

export default function Square(props) {
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
