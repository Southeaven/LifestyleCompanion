import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './Header';
import WelcomeScreen from './screens/WelcomeScreen';
import ActivityForm from './screens/ActivityForm';
import LocationComponent from './screens/LocationComponent';
import ChartScreen from './screens/ChartScreen';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="ActivityForm" component={ActivityForm} />
      <Stack.Screen name="LocationComponent" component={LocationComponent} />
      <Stack.Screen name="ChartScreen" component={ChartScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
