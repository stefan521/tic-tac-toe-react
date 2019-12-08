import React from 'react';
import { shallow, mount } from 'enzyme';
import Summary from './Summary.jsx';
import { wrap } from 'module';

describe('Status', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Summary 
      moves={
        [
          {
            player: 'X',
            square: 0,
          },
          {
            player:
            'O',
            square: 1,
          },
        ]
      }
      onClick={jest.fn()}
      stepNumber={2}
      xIsNext={true}
      status={
        {
          gameEnded: false,
          winner: null,
          line: null,
        }
      }
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('reverses move order', () => {
    const wrapper = mount(<Summary 
      moves={
        [
          {
            player: 'X',
            square: 0,
          },
          {
            player:
            'O',
            square: 1,
          },
        ]
      }
      onClick={jest.fn()}
      stepNumber={2}
      xIsNext={true}
      status={
        {
          gameEnded: false,
          winner: null,
          line: null,
        }
      }
    />);

    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('button').at(0).text()).toEqual('view moves descending');
    expect(wrapper.find('button').at(1).text()).toEqual('go to move X at (0, 2)');
    expect(wrapper.find('button').at(2).text()).toEqual('go to move O at (1, 2)');

    const buttonReverse = wrapper.find('#button-reverse');
    buttonReverse.simulate('click');

    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('button').at(0).text()).toEqual('view moves ascending');
    expect(wrapper.find('button').at(1).text()).toEqual('go to move O at (1, 2)');
    expect(wrapper.find('button').at(2).text()).toEqual('go to move X at (0, 2)');
  });
});
