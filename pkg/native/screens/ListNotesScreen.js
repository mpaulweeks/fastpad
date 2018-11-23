import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { sortNotes } from '../utils';
import DataStore from '../utils/DataStore';

import Colors from '../constants/Colors';
import ListNote from '../components/ListNote';
import Thinking from '../components/Thinking';
import { setThinking, setEditorNote } from '../redux/actions';

class ListNotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notes',
      headerLeft: (
        <Button
          onPress={() => navigation.getParam('navToSettings')()}
          title="gear"
          color={Colors.navButton}
        />
      ),
      headerRight: (
        <Button
          onPress={() => navigation.getParam('navToCreateNew')()}
          title="+"
          color={Colors.navButton}
        />
      ),
    };
  };

  state = {
    notes: null,
  };
  componentDidMount(){
    this.props.navigation.setParams({
      navToSettings: this._navToSettings,
      navToCreateNew: this._navToCreateNote,
    });
    this._fetchNotes();
  }
  _navToSettings = async () => {
    this.props.navigation.navigate('Home');
  }
  _navToCreateNote = async () => {
    await this.props.dispatch(setEditorNote(null));
    this.props.navigation.navigate('CreateNote');
  }
  _editNote = async (note) => {
    await this.props.dispatch(setEditorNote(note));
    this.props.navigation.navigate('CreateNote');
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

  render() {
    const { notes } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this._fetchNotes}/>
        <ScrollView style={styles.scroll}>
          {sortNotes(notes).map((n, i) => (
            <ListNote
              key={'note-'+i}
              index={i}
              note={n}
              doEdit={() => this._editNote(n)}
              doDelete={() => this._deleteNote(n.id)}
            />
          ))}
        </ScrollView>
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
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  thinking: state.thinking,
});

export default connect(
  mapStateToProps,
)(ListNotesScreen);
