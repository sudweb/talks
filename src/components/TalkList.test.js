import React, { Component } from 'react';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import TalkList from './TalkList';
import SelectField from 'material-ui/SelectField';
import {Tabs} from 'material-ui/Tabs';
import {ListItem} from 'material-ui/List';

const talks = [
  { 
    titre_de_ta_presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, esse.',
    prenom_et_nom: 'Alexandra Janin', 
    formats: 'Lightning Talk : 5 minutes',
  },
  { 
    titre_de_ta_presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, esse.',
    prenom_et_nom: 'Alexandra Janin', 
    formats: 'Pecha Kucha : 20 images x 20 secondes',
  },
  { 
    titre_de_ta_presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, esse.',
    prenom_et_nom: 'Alexandra Janin'
  }
];

describe('TalkList component', () => {
  it('should renders correctly', () => {
    const sortTalks = jest.fn(()=>Promise.resolve(0))
    const setFilter = jest.fn(()=>Promise.resolve(0))
    const selectTalk = jest.fn(()=>Promise.resolve(0))

    const component = shallow(
        <TalkList 
            selectedTalk={0}
            count={{'all': 3, 'PK': 2, 'PK': 1}}
            talks={talks}
            selectTalk={id => selectTalk(id)}
            setFilter={format => setFilter(format)}
            // sortBy={this.props.sortBy}
            sortTalks={value => sortTalks(value)} 
            />
    );
    component.find(Tabs).first().simulate('change')
    component.find(SelectField).first().simulate('change')
    component.find(ListItem).first().simulate('touchTap')
    expect(component).toMatchSnapshot();
  });
});