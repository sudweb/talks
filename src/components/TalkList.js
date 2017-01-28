import React, { Component } from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {teal500, red400, orange500} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import {isPK, isLT} from '../selectors/Talks';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.defaultValue !== this.state.selectedIndex) {
        this.setState({
          selectedIndex: nextProps.defaultValue
        });
      }
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class TalkList extends Component {
  getFormat(format) {
    if (isPK(format)) {
      return <Avatar backgroundColor={teal500}>PK</Avatar>
    }
    if (isLT(format)) {
      return <Avatar backgroundColor={orange500}>LT</Avatar>
    }

    return null;
  }

  getTalk(talk, i) {
    return (
        <ListItem
            key={i}
            value={i}
            onTouchTap={() => this.props.selectTalk(talk.id)}
            primaryText={talk.titre_de_ta_presentation}
            secondaryText={talk.prenom_et_nom}
            leftAvatar={this.getFormat(talk.formats)}
          />
    )
  }

  render() {
    const {talks, count} = this.props;
    return (
      <div className="TalkList">
        <Tabs 
          onChange={value => this.props.setFilter(value)} 
          tabItemContainerStyle={{backgroundColor: red400}}
          inkBarStyle={{backgroundColor: 'white'}}>
          <Tab label={`All (${count.all})`} value={null} />
          <Tab label={`PK (${count.PK})`} value="PK" />
          <Tab label={`LT (${count.LT})`} value="LT" />
        </Tabs>
        <SelectableList>
          {talks.map((talk, i) => this.getTalk(talk, i))}
        </SelectableList>
      </div>
    );
  }
}

export default TalkList;
