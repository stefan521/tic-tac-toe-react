import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square.jsx';

describe('Square', () => {
  const clickHandler = jest.fn();
  const value = 'X';

  it('renders with text and background color', () => {
    const wrapper = shallow(<Square
      winSquare={false}
      onClick={clickHandler}
      value={value}
    />);

    expect(wrapper.props().className).toEqual('grid-item');
    expect(wrapper).toMatchSnapshot();
  });
});
