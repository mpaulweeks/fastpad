import React from 'react';
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

export default class NoteEditor extends React.Component {
  input = null;
  state = {
    text: '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1\n2\n3\n4',
    editTimeout: null,
  };

  // text editing
  _handleTextChange = (newText) => {
    clearTimeout(this.state.editTimeout);
    const newTimeout = setTimeout(() => {
      this.saveNote();
    }, 5 * 1000);
    this.setState({
      text: newText,
      editTimeout: newTimeout,
    });
  }
  _defocus = () => {
    console.log('trying to defocus');
    this.input && this.input.blur();
  }
  saveNote = () => {
    // todo write to server and local note storage
    console.log('saved: ', this.state.text);
  }
  focusNote = () => {
    console.log('focused');
    this.input && this.input.focus();
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FEFAE1',
        color: '#000000',
      },
      exit: {
        paddingTop: 35, // header
        width: '100%',
        padding: 5,
      },
      exitText: {
        padding: 5,
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#666666',
      },
      keyboard: {
      },
      input: {
        flex: 1,
        padding: 15,
        fontSize: 24,
        ...this.props.userStyles,
      },
      buffer: {
        height: 90,
      },
    });
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.exit}>
          <Text
            style={styles.exitText}
            onPress={this._defocus}
          >
            done
          </Text>
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior="padding"
          >
            <TextInput
              ref={r => this.input = r}
              style={styles.input}
              multiline={true}
              onChangeText={this._handleTextChange}
              autoFocus
              placeholder="start typing your new note"
              value={text}
            />
          </KeyboardAvoidingView>
          <View style={styles.buffer} />
        </ScrollView>
      </View>
    );
  }
}
