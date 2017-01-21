import React, { Component } from 'react';
import SpreadsheetService from '../services/SpreadsheetService';
import { isPK, isLT } from '../services/FormatService';
import TalkList from './TalkList';
import Talk from './Talk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import { red500 } from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTalk: null,
      talks: null,
      filter: null,
      count: {
        all: 0,
        PK: 0,
        LT: 0
      },
      open: true
    }
  }

  componentDidMount() {
    SpreadsheetService.init()
      .then(talks => {
        this.setState({ talks: talks });

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
          return false;
        });
        this.setState({ count: { all, PK, LT } });
      })
  }

  selectTalk(i) {
    this.setState({
      selectedTalk: i
    });
  }

  setFilter(format) {
    this.setState({
      filter: format
    });
  }

  getFilteredList(talks) {
    if (this.state.filter === 'PK') {
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

  getSelectedTalk(selectedTalk) {
    if (selectedTalk === null) {
      return (
        <main>
          <p>Veuillez sélectionner un talk</p>
        </main>
      )
    }

    return (
      <Talk talk={this.state.talks[selectedTalk]} />
    )
  }

  handleToggle = () => this.setState({open: !this.state.open});

  getContent() {
    const {talks, count, selectedTalk} = this.state;

    if (talks === null) {
      return <div className="loading"><CircularProgress color={red500} size={80} thickness={5} /></div>;
    }
    return (
      <main>
        <Drawer open={this.state.open} width={360} openSecondary={true} style={{position: 'relative'}}>
          <TalkList
            selectedTalk={selectedTalk}
            count={count}
            talks={this.getFilteredList(talks)}
            selectTalk={talk => this.selectTalk(talk)}
            setFilter={format => this.setFilter(format)}
            />
        </Drawer>
        {this.getSelectedTalk(selectedTalk)}
      </main>
    );
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            onLeftIconButtonTouchTap={() => this.handleToggle()}
            style={{ backgroundColor: red500 }}
            title={<h1>Propositions de sujets Sud Web</h1>}
            />
          {this.getContent()}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
