import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './Header';
import LocationComponent from './LocationComponent';
import ActivityForm from './ActivityForm';
import ChartScreen from './ChartScreen';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />
      }}
    >
      <Stack.Screen name="LocationComponent" component={LocationComponent} />
      <Stack.Screen name="ActivityForm" component={ActivityForm} />
      <Stack.Screen name="ChartScreen" component={ChartScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
