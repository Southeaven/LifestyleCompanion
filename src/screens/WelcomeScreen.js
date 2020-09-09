import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Title
} from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});

function WelcomeScreen({ navigation, ...props }) {
  return (
    <View style={styles.container}>
      <Title>Welcome to the Lifestyle Companion</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ActivityForm')}
        style={styles.button}
      >
        Add activity
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LocationComponent')}
        style={styles.button}
      >
        Manage locations
      </Button>
    </View>
  );
}

export default WelcomeScreen;
