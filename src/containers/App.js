import { connect } from 'react-redux';

import { selectTalk, sortTalks } from '../actions/Talks';
import { filterTalks } from '../actions/App';
import { countTalksByFormats, getFilteredList } from '../selectors/Talks';
import { requestAuth, signout } from '../actions/Auth';
import AppView from '../components/AppView';

const mapStateToProps = (state) => {
  return {
    ...state,
    count: countTalksByFormats(state.talks),
    filteredTalks: getFilteredList(state)
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