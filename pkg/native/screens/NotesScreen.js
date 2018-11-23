import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import Thinking from '../components/Thinking';
import Api from '../utils/Api';

export default class NotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };
  state = {
    notes: null,
    thinking: true,
  };

  componentDidMount(){
    this._fetchNotes();
  }
  _fetchNotes(){
    Api.getNotes().then(notes => {
      this.setState({
        notes: notes,
        thinking: false,
      });
    });
  }
  _deleteNote(id){
    this.setState({
      thinking: true,
    });
    Api.deleteNote().then(() => {
      this._fetchNotes();
    });
  }

  render() {
    const { notes, thinking } = this.state;
    return (
      <View style={styles.container}>
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
                  <Text style={previewStyle}>
                    {preview}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
        <Thinking visible={thinking}/>
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
    color: 'lightblue',
  },
  preview: {
    color: '#666666',
  },
  empty: {
    color: 'salmon',
  },
});
