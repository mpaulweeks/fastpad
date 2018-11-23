import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
} from 'react-native';

import Colors from '../constants/Colors';
import { setEditorFocus } from '../redux/actions';

class NavEdit extends React.Component {
  _toggleEdit = () => {
    this.props.dispatch(setEditorFocus(!this.props.focused));
  }
  render() {
    const { focused } = this.props;
    return (
      <Button
        onPress={this._toggleEdit}
        title={focused ? 'done' : 'edit'}
        color={Colors.navButton}
      />
    );
  }
}

const mapStateToProps = state => ({
  focused: state.editor.focused,
});
export default connect(
  mapStateToProps,
)(NavEdit);
