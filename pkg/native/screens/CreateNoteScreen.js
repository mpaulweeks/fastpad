import React from 'react';
import { connect } from 'react-redux';
import {
  AppState,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import Colors from '../constants/Colors';
import NavEdit from '../components/NavEdit';
import NoteEditor from '../components/NoteEditor';

import { setEditorNote, setEditorFocus } from '../redux/actions';

class CreateNoteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
      headerLeft: (
        <Button
          onPress={() => navigation.getParam('navToListNotes')()}
          title="<"
          color={Colors.navButton}
        />
      ),
      headerRight: (
        <NavEdit />
      ),
    };
  };

  // mounting and unmounting
  componentDidMount() {
    this.props.navigation.setParams({
      navToListNotes: this._navToListNotes,
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  _navToListNotes = async () => {
    await this.props.dispatch(setEditorFocus(false));
    this.props.navigation.navigate('ListNotes');
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = async (nextAppState) => {
    console.log('new AppState:', nextAppState);
    if (nextAppState === 'active') {
      // coming back from sleep
      this.props.navigation.navigate('CreateNote');
      await this._resetNote();
      await this._focusNote();
    }
  }
  _onNav = async () => {
    if (!this.props.editor.note) {
      await this._resetNote();
      await this._focusNote();
    }
  }

  _resetNote = () => {
    return this.props.dispatch(setEditorNote({
      id: null,
      text: '',
    }));
  }
  _focusNote = () => {
    return this.props.dispatch(setEditorFocus(true));
  }

  render() {
    // todo read from local settings
    const userStyles = {};

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._onNav}/>
        <NoteEditor
          ref={r => this.editor = r}
          userStyles={userStyles}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const mapStateToProps = state => ({
  editor: state.editor,
});
export default connect(
  mapStateToProps,
)(CreateNoteScreen);
