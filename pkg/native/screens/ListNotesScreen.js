import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import DataStore from '../utils/DataStore';

import Thinking from '../components/Thinking';
import { setThinking, setEditorNote } from '../redux/actions';

class ListNotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };
  state = {
    notes: null,
  };

  componentDidMount(){
    this._fetchNotes();
  }
  _fetchNotes = async () => {
    const { dispatch } = this.props;
    await dispatch(setThinking(true));
    const notes = await DataStore.getNotes();
    this.setState({
      notes: notes,
    });
    await dispatch(setThinking(false));
  }
  _deleteNote = async (id) => {
    const { dispatch } = this.props;
    await dispatch(setThinking(true));
    const notes = await DataStore.deleteNote(id);
    this.setState({
      notes: notes,
    });
    await dispatch(setThinking(false));
  }
  _editNote = async (note) => {
    const { dispatch } = this.props;
    await dispatch(setEditorNote(note));
    this.props.navigation.navigate('CreateNote');
  }

  render() {
    const { notes } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._fetchNotes}/>
        {notes && (
          <ScrollView style={styles.scroll}>
            {notes.map((n, i) => {
              const isEmpty = !n.text;
              const preview = isEmpty ? '(empty)' : n.text.split('\n')[0].substring(0, 100);
              const previewStyle = isEmpty ? styles.empty : styles.preview;
              return (
                <View style={styles.row} key={'note-'+i}>
                  <Text style={styles.id}>
                    {n.id}
                  </Text>
                  <Text
                    style={previewStyle}
                    onPress={() => this._editNote(n)}
                  >
                    {preview}
                  </Text>
                  <Button
                    style={styles.delete}
                    onPress={() => this._deleteNote(n.id)}
                    title="delete"
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
        <Thinking />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    height: 100,
    borderBottomColor: '#666666',
    borderBottomWidth: 2,
  },
  id: {
    color: 'blue',
  },
  preview: {
    color: '#666666',
  },
  empty: {
    color: 'salmon',
  },
  delete: {
    color: 'red',
  },
});

const mapStateToProps = state => ({
  thinking: state.thinking,
});

export default connect(
  mapStateToProps,
)(ListNotesScreen);
