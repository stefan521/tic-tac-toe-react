import React from 'react';

class Status extends React.Component {
  getStatus() {
    const { status } = this.props;
    const { xIsNext } = this.props;

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

  render() {
    return (
      <div className="game-status">
        {this.getStatus()}
      </div>
    );
  }
}

export default Status;
