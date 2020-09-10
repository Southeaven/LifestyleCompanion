import * as Location from 'expo-location';
import React from 'react';
import { store } from './App'
import * as TaskManager from 'expo-task-manager';
import {getDistance} from 'geolib'
import {activateLocation, deactivateLocation} from './store/locations'

TaskManager.defineTask('geoTask', ({ data: { locations }, error }) => {
  const definedLocations = store.getState().locations;
  console.log("TASK")
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
    if (( distance < location.range) && (locations[0].coords.accuracy < location.range*2)){
      console.log("Task in location: "+location.activity)
      dispatch(activateLocation(location.id))
    }
  })

});

/*TaskManager.defineTask('geoTask', ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});*/

export default async function startLocalizationTasks() {
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
  await Location.startLocationUpdatesAsync('geoTask', {
    accuracy: Location.Accuracy.Balanced
  });
}
