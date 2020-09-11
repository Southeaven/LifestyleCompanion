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
        onPress={() => navigation.navigate('LocationScreen')}
        style={styles.button}
      >
        Manage locations
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('WorkScreen')}
        style={styles.button}
      >
        Manage works
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('OptionsScreen')}
        style={styles.button}
      >
        Options
      </Button>
    </View>
  );
}

export default WelcomeScreen;
