import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square.jsx';

describe('Square', () => {
  const clickHandler = jest.fn();
  const value = 'X';

  it('renders regularSquare with text and background color', () => {
    const regularSquare = shallow(<Square
      winSquare={false}
      onClick={clickHandler}
      value={value}
    />);

    expect(regularSquare.props().className).toEqual('grid-item');
    expect(regularSquare.find('button').hasClass('square')).toBe(true);
    expect(regularSquare.find('button').hasClass('win-o')).toBe(false);
    expect(regularSquare.find('button').hasClass('win-x')).toBe(false);
    expect(regularSquare).toMatchSnapshot();
  });

  it('renders winSquare with text and background color', () => {
    const winSquare = shallow(<Square
      winSquare={true}
      onClick={clickHandler}
      value={value}
    />);

    expect(winSquare.props().className).toEqual('grid-item');
    expect(winSquare).toMatchSnapshot();
  });
});
