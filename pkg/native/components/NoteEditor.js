import React from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

export default class NoteEditor extends React.Component {
  input = null;
  state = {
    note: null,
    editTimeout: null,
  };

  componentWillReceiveProps(props) {
    const { note } = this.props;
    if (!note || note.id !== props.note.id){
      this.setState({
        note: props.note,
      });
    }
  }

  // text editing
  _handleTextChange = (newText) => {
    clearTimeout(this.state.editTimeout);
    const newTimeout = setTimeout(() => {
      this.saveNote();
    }, 5 * 1000);
    this.setState({
      note: {
        ...this.state.note,
        text: newText,
      },
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
      header: {
        paddingTop: 35, // header
        width: '100%',
        padding: 5,
      },
      id: {
        padding: 5,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'lightblue',
      },
      done: {
        padding: 5,
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#666666',
      },
      scroll: {
        flex: 1,
      },
      input: {
        padding: 15,
        fontSize: 24,
        ...this.props.userStyles,
      },
      buffer: {
        height: 200,
      },
    });
    const { note } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={styles.id}
          >
            {note && note.id}
          </Text>
          <Text
            style={styles.done}
            onPress={this._defocus}
          >
            done
          </Text>
        </View>
        {note ? (
          <ScrollView style={styles.scroll}>
            <TextInput
              ref={r => this.input = r}
              style={styles.input}
              multiline={true}
              onChangeText={this._handleTextChange}
              autoFocus
              placeholder="start typing your new note"
              value={note.text}
            />
            <View style={styles.buffer} />
          </ScrollView>
        ) : (
          <View>
            <Text>loading...</Text>
          </View>
        )}
      </View>
    );
  }
}
