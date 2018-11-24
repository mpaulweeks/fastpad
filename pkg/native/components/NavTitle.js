import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { prettyUTC } from '../utils';
import { setEditorFocus } from '../redux/actions';

class NavTitle extends React.Component {
  render() {
    const { note } = this.props;
    const title = (note && note.created) ? prettyUTC(note.created) : 'Unsaved Draft';
    return (
      <Text style={styles.title}>
        {title}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: Colors.noteCreated,
  },
});

const mapStateToProps = state => ({
  note: state.notes.editor.note,
});
export default connect(
  mapStateToProps,
)(NavTitle);
