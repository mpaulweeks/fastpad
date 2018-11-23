import React from 'react';
import {
  AppState,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import NoteEditor from '../components/NoteEditor';

export default class CreateNoteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    note: null,
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
    this.setState({
      note: {
        id: new Date().getTime(),
        text: '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1\n2\n3\n4',
      },
    }, () => {
      // to remount Editor
      this.forceUpdate();
    });
  }
  _saveNote = () => {
    this.editor && this.editor.saveNote();
  }
  _focusNote = () => {
    this._resetNote();
    this.editor && this.editor.focusNote();
  }

  render() {
    const { note } = this.state;
    // todo read from local settings
    const userStyles = {};


    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._focusNote}/>

        {note && (
          <NoteEditor
            ref={r => this.editor = r}
            note={note}
            userStyles={userStyles}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
