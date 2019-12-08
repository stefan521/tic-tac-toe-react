import React from 'react';
import { shallow } from 'enzyme';
import Status from './Status.jsx';

describe('Status', () => {
  it('displays a status', () => {
    const wrapper = shallow(<Status
      status={
        {
          gameEnded: false,
          winner: null,
        }
      }
      xIsNext={false}
    />);

    expect(wrapper.text()).toEqual('Next player: O');
    expect(wrapper).toMatchSnapshot();
  });

  it('displays a draw', () => {
    const wrapper = shallow(<Status
      status={
        {
          gameEnded: true,
          winner: null,
        }
      }
      xIsNext={false}
    />);

    expect(wrapper.text()).toEqual('Draw');
  });

  it('displays a win', () => {
    const wrapper = shallow(<Status
      status={
        {
          gameEnded: true,
          winner: 'O',
        }
      }
      xIsNext={true}
    />);

    expect(wrapper.text()).toEqual('Winner: O');
  });
});
