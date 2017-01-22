import React, { Component } from 'react';
import SpreadsheetService from '../services/SpreadsheetService';
import { isPK, isLT, countTalksByFormats } from '../services/FormatService';
import TalkList from './TalkList';
import Talk from './Talk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import { red500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


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
      auth: false,
      errorMessage: null,
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

  handleError(error) {
    let message = error.message;

    switch(error.status) {
      case 'PERMISSION_DENIED':
        message = 'Vous n\'êtes pas autorisé(e) à accéder à cette ressource.';
        break;
    }

    this.setState({auth: false, errorMessage: message})
  }

  loadSheetData() {
    this.setState({auth: true});
    SpreadsheetService.loadSheetsApi()
      .then(talks => {
        this.setState({ talks: talks, count: countTalksByFormats(talks) });
      })
      .catch(error => this.handleError(error));
  }

  handleAuthResult() {
    SpreadsheetService.authorize()
      .then(() => this.loadSheetData())
      .catch(error => this.handleError(error));
    return false;
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.handleAuthResult());
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

  getErrors() {
    const {errorMessage} = this.state;
    if (errorMessage !== null) {
      return (
        <p style={{color: red500}}>{errorMessage}</p>
      )
    }

    return null;
  }

  getContent() {
    const {talks, count, selectedTalk, auth} = this.state;
    
    if (!auth) {
      return (
        <main>
          <p>Vous devez être connecté pour accéder à cette ressouce</p>
          {this.getErrors()}
          <RaisedButton onClick={() => this.handleAuthResult()} label="Se connecter sur Google Drive" backgroundColor={red500} labelColor='white' />
        </main>
      )
    }

    if (talks === null) {
      return <div className="loading"><CircularProgress color={red500} size={80} thickness={5} /></div>;
    }

    return (
      <main>
        <Drawer 
          open={this.state.open} 
          className='drawer'
          width={360} 
          openSecondary={true} 
          style={{position: 'relative'}}>
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
    console.log(this.state);
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
