// @flow
import React from 'react';

type Props = {
  status: {
    gameEnded: boolean,
    winner: string
  },
  xIsNext : boolean
};

function getStatus(status, xIsNext) {
  let statusLine;

  if (status.gameEnded && status.winner) {
    statusLine = `Winner: ${status.winner}`;
  } else if (status.gameEnded) {
    statusLine = 'Draw';
  } else {
    statusLine = `Next player: ${xIsNext === true ? 'X' : 'O'}`;
  }

  return statusLine;
}

function Status(props: Props) {
  const { status } = props;
  const { xIsNext } = props;

  return (
    <div className="game-status">
      {getStatus(status, xIsNext)}
    </div>
  );
}

export default Status;
