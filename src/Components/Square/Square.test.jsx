import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square.jsx';

describe('Square', () => {
  const clickHandler = jest.fn();
  const background = 'red';
  const value = 'X';

  it('renders with text and background color', () => {
    const wrapper = shallow(<Square
      color={background}
      onClick={clickHandler}
      value={value}
    />);

    console.log(wrapper.props());

    expect(wrapper.props().style.background).toEqual(background);
    expect(wrapper.props().children).toEqual('X');
    expect(wrapper).toMatchSnapshot();
  });
});
