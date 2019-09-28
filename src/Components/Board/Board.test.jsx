import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board.jsx';
import Square from '../Square/Square.jsx';

describe('Board', () => {
  const clickHandler = jest.fn();

  it('contains 9 squares', () => {
    const wrapper = shallow(<Board
      squares={Array(9).fill('X')}
      onClick={clickHandler}
      winLine={[1, 2, 3]}
    />);

    expect(wrapper.find(Square)).toHaveLength(9);
    expect(wrapper).toMatchSnapshot();
  });
});
