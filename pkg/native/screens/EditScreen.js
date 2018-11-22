import React from 'react';
import {
  AppState,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'New Note',
  };
  input = null;
  state = {
    text: '',
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
      this._focusText();
    }
  }
  _focusText = () => {
    console.log('focused');
    this.input && this.input.focus();
  }

  // text editing
  _handleTextChange = (newText) => {
    clearTimeout(this.state.editTimeout);
    this.setState({
      text: newText,
      editTimeout: setTimeout(() => {
        this._saveNote();
      }, 5 * 1000),
    });
  }
  _saveNote = () => {
    clearTimeout(this.state.editTimeout);
    // todo write to server and local note storage
    console.log(this.state.text);
  }

  render() {
    const { text } = this.state;
    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onWillFocus={this._focusText}/>
        <TextInput
          ref={r => this.input = r}
          style={styles.input}
          multiline={true}
          onChangeText={this._handleTextChange}
          autoFocus
          placeholder="start typing your new note"
          value={text}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FEFAE1',
  },
  input: {
    height: '100%',
    fontSize: 24,
  },
});
