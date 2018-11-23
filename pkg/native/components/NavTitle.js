import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { setEditorFocus } from '../redux/actions';

class NavTitle extends React.Component {
  printUTC = (utcStr) => {
    const dateObj = new Date(utcStr);
    let ampm = 'am';
    let h = dateObj.getHours();
    let m = dateObj.getMinutes();
    let s = dateObj.getSeconds();
    if (h >= 12){
      if (h > 12) {
        h -= 12;
      }
      ampm = 'pm';
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    return `${dateObj.toLocaleDateString()} ${h}:${m} ${ampm}`;
  }
  render() {
    const { note } = this.props;
    const title = (note && note.created) ? this.printUTC(note.created) : 'draft';
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
  },
});

const mapStateToProps = state => ({
  note: state.editor.note,
});
export default connect(
  mapStateToProps,
)(NavTitle);
