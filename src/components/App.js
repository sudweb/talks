import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectTalk, sortTalks } from '../actions/Talks';
import { filterTalks } from '../actions/App';
import { countTalksByFormats, getFilteredList } from '../selectors/Talks';
import { requestAuth, signout } from '../actions/Auth';

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

class AppView extends Component {
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
    this.state = { drawerIsOpen: true }
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.props.requestAuth(true));
  }

  getErrors() {
    const {errorMessage} = this.props;
    if (errorMessage !== null) {
      return (
        <p style={{color: red500}}>{errorMessage}</p>
      )
    }
    return null;
  }

  getSelectedTalk(selectedTalk) {
    if (selectedTalk === null) {
      return (
        <main>
          <p>Veuillez sélectionner un talk</p>
        </main>
      )
    }

    const talk = this.props.talks[selectedTalk];

    return (
      <Talk talk={talk} />
    )
  }

  getProfile() {
    return <Profile profile={this.props.profile} signout={() => this.props.signout()} />
  }

  getContent() {
    const {
      loader,
      count, 
      selectedTalk,
      permission,
      filteredTalks
    } = this.props;
    
    if (loader) {
      return <div className="loading"><CircularProgress color={red500} size={80} thickness={5} /></div>;
    }

    if (permission === null) {
      return (
        <main>
          {this.getErrors()}
          <RaisedButton onClick={() => this.props.requestAuth()} label="Se connecter sur Google Drive" backgroundColor={red500} labelColor='white' />
        </main>
      )
    }
    
    return (
      <main>
        <Drawer 
          open={this.state.drawerIsOpen} 
          className='drawer'
          width={360} 
          openSecondary={true} 
          style={{position: 'relative'}}>
          <TalkList
            selectedTalk={selectedTalk}
            count={count}
            talks={filteredTalks}
            selectTalk={id => this.props.selectTalk(id)}
            setFilter={format => this.props.filterTalks(format)}
            sortBy={this.props.sortBy}
            sortTalks={value => this.props.sortTalks(value)}
            />
        </Drawer>
        {this.getSelectedTalk(selectedTalk)}
      </main>
    );
  }

  toggleDrawer = () => this.setState({drawerIsOpen: !this.state.drawerIsOpen});

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            onLeftIconButtonTouchTap={() => this.toggleDrawer()}
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

const mapStateToProps = (state) => {
  return {
    ...state,
    count: countTalksByFormats(state.talks),
    filteredTalks: getFilteredList(state.talks, state.filter, state.sortBy)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestAuth: immediate => dispatch(requestAuth(immediate)),
    filterTalks: format => dispatch(filterTalks(format)),
    selectTalk: id => dispatch(selectTalk(id)),
    signout: () => dispatch(signout()),
    sortTalks: value => dispatch(sortTalks(value))
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default App;