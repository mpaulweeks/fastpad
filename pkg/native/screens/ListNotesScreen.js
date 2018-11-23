import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import Thinking from '../components/Thinking';
import DataStore from '../utils/DataStore';

export default class ListNotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };
  state = {
    notes: null,
    thinking: false,
  };

  componentDidMount(){
    this._fetchNotes();
  }
  _fetchNotes = () => {
    if (this.state.thinking){
      return;
    }
    this.setState({
      thinking: true,
    }, () => DataStore.getNotes().then(notes => {
      this.setState({
        notes: notes,
        thinking: false,
      });
    }));
  }
  _deleteNote = id => {
    this.setState({
      thinking: true,
    }, () => DataStore.deleteNote(id).then(notes => {
      this.setState({
        notes: notes,
        thinking: false,
      });
    }));
  }

  render() {
    const { notes, thinking } = this.state;
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
                  <Text style={previewStyle}>
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
