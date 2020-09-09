import * as Location from 'expo-location';
import React, { useEffect } from 'react';
import * as TaskManager from 'expo-task-manager';
import { store } from './App'

export default function startLocalizationTasks() {
  const locations = store.getState().locations
  for (let i = 0; i < locations.length; i++) {
    Location.startGeofencingAsync(locations[i].activity, [{
      latitude: locations[i].latitude,
      longitude: locations[i].longitude,
      radius: locations[i].range,
      notifyOnEnter: true,
      notifyOnExit: true,
    }])
    TaskManager.defineTask(locations[i].activity, ({ data: { eventType, region }, error }) => {
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
  }
}
