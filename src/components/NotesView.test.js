import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import NotesView from './NotesView';

const othersNote =  [
  ['alex', 0],
  ['frank', 0],
  ['amanda', 1]
]; 

describe('NotesView component', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <NotesView
        voteOpen={true}
        ownNote={0} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly', () => {
    const vote = jest.fn(()=>Promise.resolve(0))
    const component = shallow(
      <NotesView
        voteOpen={true}
        vote={vote}
        othersNote={othersNote}
        ownName='Alex'
        ownNote={0} />
    );

    component.find(IconButton).first().simulate('click')
    component.find(SelectField).first().simulate('change')
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly without ownName', () => {
    const vote = jest.fn(()=>Promise.resolve(0))
    const component = shallow(
      <NotesView
        voteOpen={true}
        vote={vote}
        othersNote={othersNote}
        ownName={null}
        myProfileName='Alex'
        ownNote={0} />
    );

    component.find(IconButton).first().simulate('click')
    component.find(SelectField).first().simulate('change')
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly without othersNote', () => {
    const vote = jest.fn(()=>Promise.resolve(0))
    const component = shallow(
      <NotesView
        voteOpen={true}
        vote={vote}
        othersNote={[['test', undefined]]}
        ownName={null}
        myProfileName='Alex'
        ownNote={0} />
    );

    component.find(IconButton).first().simulate('click')
    component.find(SelectField).first().simulate('change')
    expect(component).toMatchSnapshot();
  });

  it('should rerenders correctly on recieve props', () => {
    const component = shallow(
      <NotesView
        othersNote={[['test', undefined]]}
        ownName='Test'
        myProfileName='Test'
        ownNote={0} />
    );

    expect(component.children().find('#ownNote').props().value).toEqual(0);
    component.setProps({ ownNote: -2 });
    expect(component.children().find('#ownNote').props().value).toEqual(-2);
  });
});