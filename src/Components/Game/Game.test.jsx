import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Game from './Game.jsx';
import Board from '../Board/Board.jsx';
import Status from '../Status/Status.jsx';
import Summary from '../Summary/Summary.jsx';

describe('Game', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('hasn\'t changed structure', () => {
    const game = <Game />;

    expect(game).toMatchSnapshot();
  });

  it('has correct components inside', () => {
    const wrapper = shallow(<Game />);

    expect(wrapper.find(Board)).toHaveLength(1);
    expect(wrapper.find(Summary)).toHaveLength(1);
    expect(wrapper.find(Status)).toHaveLength(1);
  });
});
