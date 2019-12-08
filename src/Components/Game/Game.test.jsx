import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Game from './Game.jsx';
import Board from '../Board/Board.jsx';
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
  });

  it('updates board when square is clicked', () => {
    const game = mount(<Game />);
    const firstHistory = Array(9).fill(null);
    const secondHistory = [null, 'X', null, null, null, null, null, null, null];

    expect(game.state('history').length).toBe(1);
    expect(game.state('history')[0].squares.every((el, index) => el === firstHistory[index])).toBeTruthy();
    expect(game.state('stepNumber')).toBe(0);
    expect(game.state('xIsNext')).toBeTruthy();

    game.find('.square').at(1).simulate('click');

    expect(game.state('history').length).toBe(2);
    expect(game.state('history')[0].squares.every((el, index) => el === firstHistory[index])).toBeTruthy();
    expect(game.state('history')[1].squares.every((el, index) => el === secondHistory[index])).toBeTruthy();
    expect(game.state('stepNumber')).toBe(1);
    expect(game.state('xIsNext')).toBeFalsy();
  });
});
