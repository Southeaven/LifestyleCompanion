import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Title
} from 'react-native-paper';
import { resetStore } from '../store/debug';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '100%'
  },
  container: {
    margin: 10
  }
});

function OptionsScreen({ resetData, ...props }) {
  const handleResetData = () => resetData();

  return (
    <View style={styles.container}>
      <Title>Options</Title>
      <Button
        mode="contained"
        onPress={handleResetData}
        style={styles.button}
      >
        Delete saved data
      </Button>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    resetData: () => {
      dispatch(resetStore());
    },
  }
}

export default connect(null, mapDispatchToProps)(OptionsScreen);
