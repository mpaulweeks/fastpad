import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import DataStore from '../utils/DataStore';

import { setEditorFocus, setEditorNote } from '../redux/actions';

class NoteEditor extends React.Component {
  input = null;
  state = {
    editTimeout: null,
  };

  componentWillReceiveProps(newProps) {
    const { focused } = newProps;
    if (focused) {
      this.input && this.input.focus();
    } else {
      this.input && this.input.blur();
    }
  }

  // text editing
  _handleTextChange = async (newText) => {
    clearTimeout(this.state.editTimeout);
    const newTimeout = setTimeout(() => {
      this.saveNote();
    }, 10 * 1000);

    const newNote = {
      ...this.props.note,
      text: newText,
    };
    await this.props.dispatch(setEditorNote(newNote));
    this.setState({
      editTimeout: newTimeout,
    });
  }
  _toggleEdit = () => {
    this.props.dispatch(setEditorFocus(!this.props.focused));
  }
  saveNote = async (exiting) => {
    // clear potentially waiting save
    clearTimeout(this.state.editTimeout);

    const { note } = this.props;

    console.log('saving: ', note);
    if (note.text) {
      const newNote = await (note.id
        ? DataStore.updateNote(note.id, note.text)
        : DataStore.createNote(note.text)
      );
      await this.props.dispatch(setEditorNote({
        ...note,
        ...newNote,
      }));
    } else if (exiting && note.id) {
      // delete empty note
      DataStore.deleteNote(note.id);
    }
  }

  focusNote = () => {
    this.props.dispatch(setEditorFocus(true));
  }
  onFocus = () => {
    this.props.dispatch(setEditorFocus(true));
  }
  onBlur = () => {
    this.props.dispatch(setEditorFocus(false));
    this.saveNote();
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FEFAE1',
        color: '#000000',
      },
      header: {
        paddingTop: 45, // header
        width: '100%',
        padding: 5,
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
    const { focused, note } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={styles.done}
            onPress={this._toggleEdit}
          >
            {focused ? 'done' : 'edit'}
          </Text>
        </View>
        {note ? (
          <ScrollView style={styles.scroll}>
            <TextInput
              ref={r => this.input = r}
              style={styles.input}
              multiline={true}
              onChangeText={this._handleTextChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
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


const mapStateToProps = state => ({
  focused: state.editor.focused,
  note: state.editor.note,
});
export default connect(
  mapStateToProps,
)(NoteEditor);
