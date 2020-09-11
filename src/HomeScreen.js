import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './Header';
import WelcomeScreen from './screens/WelcomeScreen';
import ActivityForm from './screens/ActivityForm';
import LocationScreen from './screens/LocationScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import OptionsScreen from './screens/OptionsScreen';
import WorkScreen from './screens/WorkScreen';

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
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
      <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
      <Stack.Screen name="WorkScreen" component={WorkScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
