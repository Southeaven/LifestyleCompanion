import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';
import createStore from './store';
export const { store, persistor } = createStore()
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {getDistance} from 'geolib'
import {activateLocation, deactivateLocation} from './store/locations'
import { addActivityRange } from './store/activities'

TaskManager.defineTask('geoTask', ({ data: { locations }, error }) => {
  const definedLocations = store.getState().locations;
  if (error) {
    console.log("TASK_ERROR")
    // check `error.message` for more details.
    return;
  }
  definedLocations.map((location) => {
    let distance = getDistance(
          { latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude },
          { latitude: location.latitude, longitude: location.longitude }
      )
    if ((( distance < location.range) && (locations[0].coords.accuracy < location.range*2)) && !location.active){
      store.dispatch(activateLocation(location.id))
    }else if (!(( distance < location.range) && (locations[0].coords.accuracy < location.range*2)) && location.active){
      store.dispatch(deactivateLocation(location.id))
      store.dispatch(addActivityRange({
        activityName: location.activity,
        firstDate: location.activationDate,
        secondDate: new Date()
      }))
      console.log(store.getState().activities)
      }
    }
  )
});


export async function startLocalizationTasks() {
  console.log("Starting geotasks")
  /*const locations = store.getState().locations;
  let geofencingRegions = [];

  for (let i = 0; i < locations.length; i++) {
    geofencingRegions.push({
      latitude: locations[i].latitude,
      longitude: locations[i].longitude,
      radius: locations[i].range,
      notifyOnEnter: true,
      notifyOnExit: true,
    });
  }*/
  //await Location.startGeofencingAsync('geoTask', geofencingRegions);
  await Location.requestPermissionsAsync();
  await Location.startLocationUpdatesAsync('geoTask', {
    accuracy: Location.Accuracy.Highest
  })
  
}

function App() {
  startLocalizationTasks()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}


export default registerRootComponent(App)
