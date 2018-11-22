import React from 'react';
import {
  AppState,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };
  state = {
    text: 'hello world\n\nnice!',
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      console.log('App is going to the background!');
      this._archive();
    }
  }
  _handleTextChange = (newText) => {
    clearTimeout(this.state.editTimeout);
    this.setState({
      text: newText,
      editTimeout: setTimeout(() => {
        this._archive();
      }, 5 * 1000),
    });
  }
  _archive = () => {
    clearTimeout(this.state.editTimeout);
    // todo write to server and local note storage
    console.log(this.state.text);
  }

  render() {
    const { text } = this.state;
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={this._handleTextChange}
          value={text}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FEFAE1',
  },
  input: {
    height: '100%',
    fontSize: 24,
  },
});
