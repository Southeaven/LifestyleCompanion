import * as Location from 'expo-location';
import React from 'react';
import * as TaskManager from 'expo-task-manager';
import { store } from './App'

export default function startLocalizationTasks() {
  const locations = store.getState().locations;
  let geofencingRegions = [];

  TaskManager.defineTask('geoTask', ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  });

  for (let i = 0; i < locations.length; i++) {
    geofencingRegions.push({
      latitude: locations[i].latitude,
      longitude: locations[i].longitude,
      radius: locations[i].range,
      notifyOnEnter: true,
      notifyOnExit: true,
    });
  }
  Location.startGeofencingAsync('geoTask', geofencingRegions);
}
