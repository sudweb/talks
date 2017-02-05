import React, { Component } from 'react';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import Talk from './Talk';

const mockTalk = { 
  title: 'test', 
  email: 'test@test.com', 
  formats: 'Lightning Talk : 5 minutes',
  si_le_public_ne_devait_retenir_quune_chose_ce_serait: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, earum.' 
};

describe('Talk component', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <Talk talk={mockTalk}></Talk>
    );
    expect(component).toMatchSnapshot();
  });
});