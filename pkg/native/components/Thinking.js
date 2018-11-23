import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';

class Thinking extends React.Component {
  render() {
    const styles = StyleSheet.create({
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      innerContainer: {
        width: 'auto',
        padding: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
      },
    })
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.thinking}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text>
              loading, please wait...
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  thinking: state.thinking,
});

export default connect(
  mapStateToProps,
)(Thinking);
