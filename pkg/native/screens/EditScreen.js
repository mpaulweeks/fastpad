import React from 'react';
import {
  AppState,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import NoteEditor from '../components/NoteEditor';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // mounting and unmounting
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log('new AppState:', nextAppState);
    if (nextAppState === 'background') {
      this._saveNote();
    }
    if (nextAppState === 'active') {
      this._focusNote();
    }
  }

  _saveNote = () => {
    this.editor && this.editor.saveNote();
  }
  _focusNote = () => {
    this.editor && this.editor.focusNote();
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
    backgroundColor: 'blue',
  },
});
