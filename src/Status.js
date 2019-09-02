import React from 'react';

class Status extends React.Component {
  getStatus() {
    let status;
    if (this.props.winner) {
      status = 'Winner: ' + this.props.winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return status;
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
