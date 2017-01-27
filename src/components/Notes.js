import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red500 } from 'material-ui/styles/colors';
import { ListItem } from 'material-ui/List';

import { append } from '../services/GoogleAPI';


class Notes extends Component {

  handleNestedListToggle = (item) => {
    this.setState({
      voteOpen: item.state.open,
    });
  };

  render() {
    const average = this.props.average === undefined ? '-' : this.props.average;
    const notes = this.props.notes;

    let myNote = null;
    let myName = this.props.profileName;
    
    Object.keys(notes).filter(name => {
      if (this.props.profileName.includes(name)) {
        myNote = notes[name];
        myName = name;
      }
    })

    const othersNote = {...notes};
    delete othersNote[myName];
    
    let voteButton = (
      <IconButton
        onClick={() => append()}
        touch={true}
        tooltipPosition="top-right"
        style={{ padding: 0, width: 32 }}
        >
        <EditorEdit />
      </IconButton>
    );

    if (myNote === undefined) {
      myNote = 'Pas encore voté !';
      voteButton = <RaisedButton onClick={() => append()} label="Voter" backgroundColor={red500} labelColor={'white'} />;
    }

    let peopleNotes = [];

    peopleNotes.push(
      <ListItem
        disabled={true}
        key={'mine'}
        primaryText={`Ma note (${myName}) : ${myNote}`}
        rightIcon={voteButton} />
    );

    console.log(othersNote);
    for (let i = 0; i < Object.keys(othersNote).length; i++) {
      const member = Object.keys(othersNote)[i];
      if (othersNote[member] !== undefined) {
        peopleNotes.push(<ListItem key={i} disabled={true} primaryText={member + ' : ' + othersNote[member]} />);
      }
    }
    return (
      <ListItem
        disabled={true}
        primaryText={
          <span>
            <strong>Note : </strong>{average}
          </span>
        }
        onNestedListToggle={this.handleNestedListToggle}
        nestedItems={peopleNotes}
        />
    );
  }
}

export default Notes;