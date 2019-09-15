// @flow
import React from 'react';

type GameStatus = {
  status: {
    gameEnded: boolean,
    winner: string
  }
};

function getStatus(status, xIsNext) {
  let statusLine;

  if (status.gameEnded && status.winner) {
    statusLine = `Winner: ${status.winner}`;
  } else if (status.gameEnded) {
    statusLine = 'Draw';
  } else {
    statusLine = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return statusLine;
}

const Status = ({ status }: GameStatus, xIsNext: boolean) => (
  <div className="game-status">
    {getStatus(status, xIsNext)}
  </div>
);

export default Status;
