import React, { Component } from 'react';
import SpreadsheetService from '../services/SpreadsheetService';
import {isPK, isLT} from '../services/FormatService';
import TalkList from './TalkList';
import Talk from './Talk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

import {red500} from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTalk: null,
      talks: null,
      filter: null,
      count:  {
        all: 0,
        PK: 0,
        LT: 0
      }
    }
  }

  componentDidMount() {
    SpreadsheetService.init()
    .then(talks => {
      this.setState({talks: talks});

      let all = talks.length,
        PK = 0,
        LT = 0;
      talks.map(talk => {
        if (isPK(talk.formats)) {
          PK++;
        }
        if (isLT(talk.formats)) {
          LT++;
        }
      });
      this.setState({count: {all, PK, LT}});
    })
  }

  selectTalk(talk) {
    this.setState({
      selectedTalk: talk
    });
  }

  setFilter(format) {
    this.setState({
      filter: format
    });
  }

  getFilteredList(talks) {
    if (this.state.filter === 'PK') {
      console.log(0)
      return talks.filter(talk => {
        return isPK(talk.formats);
      });
    }

    if (this.state.filter === 'LT') {
      return talks.filter(talk => {
        return isLT(talk.formats);
      });
    }

    return talks;
  }


  render() {
    const {talks, count} = this.state;
    console.log(this.state)
    if (talks === null) {
      return <p>Loading...</p>;
    }

    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            style={{backgroundColor: red500}}
            title={<h1>Propositions de sujets Sud Web</h1>}
          />
          <main>
            <TalkList 
              count={count}
              talks={this.getFilteredList(talks)} 
              selectTalk={talk =>  this.selectTalk(talk)}
              setFilter={format => this.setFilter(format)}
            />
            <Talk talk={this.state.selectedTalk} />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
