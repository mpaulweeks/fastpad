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

  // managing focus
  componentDidUpdate(prevProps) {
    const { focused, note } = this.props;
    if (focused !== prevProps.focused) {
      if (focused){
        this.input && this.input.focus();
      } else {
        this.input && this.input.blur();
      }
    }
  }
  onFocus = () => {
    this.props.dispatch(setEditorFocus(true));
  }
  onBlur = () => {
    this.props.dispatch(setEditorFocus(false));
    this.saveNote();
  }

  // text editing
  _handleTextChange = async (newText) => {
    const newNote = {
      ...this.props.note,
      text: newText,
    };
    await this.props.dispatch(setEditorNote(newNote));

    clearTimeout(this.state.editTimeout);
    const newTimeout = setTimeout(() => {
      this.saveNote();
    }, 10 * 1000);
    this.setState({
      editTimeout: newTimeout,
    });
  }
  saveNote = async (exiting) => {
    // clear potentially waiting save
    clearTimeout(this.state.editTimeout);

    const { dispatch, note } = this.props;
    if (note.text) {
      const newNote = await (note.id
        ? dispatch(DataStore.updateNote(note.id, note.text))
        : dispatch(DataStore.createNote(note.text))
      );
    } else if (exiting && note.id) {
      // delete empty note
      dispatch(DataStore.deleteNote(note.id));
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FEFAE1',
        color: '#000000',
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
  focused: state.notes.editor.focused,
  note: state.notes.editor.note,
});
export default connect(
  mapStateToProps,
)(NoteEditor);
