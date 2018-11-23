import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { prettyUTC } from '../utils';

class ListNote extends React.Component {
  render() {
    const { index, note, doEdit, doDelete } = this.props;

    const created = prettyUTC(note.created);
    const preview = note.text;

    return (
      <View style={[styles.row, { borderTopWidth: index === 0 ? 0 : 2}]}>
        <View style={styles.header}>
          <Text style={styles.created}>
            {created}
          </Text>
          <Text style={styles.delete} onPress={doDelete}>
            delete
          </Text>
        </View>
        <Text
          style={styles.preview}
          onPress={doEdit}
        >
          {preview}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    backgroundColor: Colors.listBackground,
    borderColor: Colors.listSeparator,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  created: {
    color: Colors.noteCreated,
  },
  delete: {
    color: 'red',
  },
  preview: {
    height: 40,
    overflow: 'hidden',
    fontSize: 14,
    color: Colors.listForeground,
  },
});

export default ListNote;
