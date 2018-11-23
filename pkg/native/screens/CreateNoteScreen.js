import React from 'react';
import { connect } from 'react-redux';
import {
  AppState,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import NoteEditor from '../components/NoteEditor';

import { setEditorNote, setEditorFocus } from '../redux/actions';

class CreateNoteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // mounting and unmounting
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._resetNote();
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log('new AppState:', nextAppState);
    if (nextAppState === 'active') {
      this._focusNote();
    }
  }

  _resetNote = () => {
    this.props.dispatch(setEditorNote({
      id: null,
      text: 'sample text ' + new Date().getTime(),
    }));
  }
  _focusNote = () => {
    this._resetNote();
    this.props.dispatch(setEditorFocus(true));
  }

  render() {
    // todo read from local settings
    const userStyles = {};

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._focusNote}/>
        <NoteEditor
          ref={r => this.editor = r}
          userStyles={userStyles}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default connect()(CreateNoteScreen);
