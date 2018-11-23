import React from 'react';
import { connect } from 'react-redux';
import {
  AppState,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import NoteEditor from '../components/NoteEditor';

import { setEditorNote, setEditorFocus } from '../redux/actions';

class CreateNoteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // mounting and unmounting
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._resetNote();
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log('new AppState:', nextAppState);
    if (nextAppState === 'active') {
      this._focusNote();
    }
  }

  _resetNote = () => {
    this.props.dispatch(setEditorNote({
      id: null,
      text: 'sample text ' + new Date().getTime(),
    }));
  }
  _focusNote = () => {
    this._resetNote();
    this.props.dispatch(setEditorFocus(true));
  }

  _gotoListNotesScreen = () => {
    this.props.navigation.navigate('ListNotes');
  }

  render() {
    // todo read from local settings
    const userStyles = {};

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._focusNote}/>
        <NoteEditor
          ref={r => this.editor = r}
          userStyles={userStyles}
        />
        <View style={styles.gotoList}>
          <Text style={styles.gotoListText} onPress={this._gotoListNotesScreen}>
            &lt;
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gotoList: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 45,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  gotoListText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default connect()(CreateNoteScreen);
