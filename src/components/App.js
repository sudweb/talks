import React, { Component } from 'react';
import {authorize} from '../services/AuthService';
import {getTalks} from '../services/TalksService';
import {getProfile} from '../services/ProfileService';
import { isPK, isLT, countTalksByFormats } from '../services/FormatService';
import TalkList from './TalkList';
import Talk from './Talk';
import Profile from './Profile';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      profile: null,
      selectedTalk: null,
      talks: null,
      notes: null,
      filter: null,
      count: {
        all: 0,
        PK: 0,
        LT: 0
      },
      open: true
    }
  }

  loadData() {
    this.setState({auth: true});
    getTalks()
      .then(talks => this.setState({ talks: talks, count: countTalksByFormats(talks) }))
      .catch(error => this.handleError(error));

    getProfile()
      .then(profile => this.setState({profile: profile}))
      .catch(error => this.handleError(error));
  }

  handleAuthResult(immediate) {
    authorize(immediate)
      .then(() => this.loadData())
      .catch(error => this.handleError(error))
    return false;
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.handleAuthResult(true));
  }

  selectTalk    = i => this.setState({selectedTalk: i});
  setFilter     = format => this.setState({filter: format});
  handleToggle  = () => this.setState({open: !this.state.open});

  handleError(error) {
    let message = error.message;

    switch(error.status) {
      case 'PERMISSION_DENIED':
        message = 'Vous n\'êtes pas autorisé(e) à accéder à cette ressource.';
        break;
      default:
        break;
    }

    this.setState({auth: false, errorMessage: message})
  }

  getErrors() {
    const {errorMessage} = this.state;
    if (errorMessage !== null) {
      return (
        <p style={{color: red500}}>{errorMessage}</p>
      )
    }
    return null;
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

  getProfile() {
    const signout = () => {
      this.setState({auth: false, profile: null});
      signout();
    }

    return <Profile profile={this.state.profile} signout={() => signout()} />
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
            iconElementRight={this.getProfile()}
            iconStyleRight={{margin: 0}}
            />
          {this.getContent()}
          <Profile />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
