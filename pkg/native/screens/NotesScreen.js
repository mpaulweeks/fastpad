import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import Api from '../utils/Api';

export default class NotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };
  state = {
    notes: null,
  };

  componentDidMount(){
    this._fetchNotes();
  }
  _fetchNotes(){
    Api.getNotes().then(notes => {
      this.setState({
        notes: notes,
      });
    });
  }

  render() {
    const { notes } = this.state;
    return (
      <ScrollView style={styles.container}>
        {notes ? (
          notes.map((n, i) => (
            <View style={styles.row} key={'note-'+i}>
              <Text>
                {n.id}
                {n.text}
              </Text>
            </View>
          ))
        ) : (
          <Text>
            loading...
          </Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    height: 100,
    borderBottomColor: '#666666',
    borderBottomWidth: 2,
  },
});
