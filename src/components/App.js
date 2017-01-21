import React, { Component } from 'react';
import Talks from './Talks';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <main className="wrapper">
          <Talks />
        </main>
      </MuiThemeProvider>
    );
  }
}

export default App;
