import * as Location from 'expo-location';
import React from 'react';
import { store } from './App'
import * as TaskManager from 'expo-task-manager';
import {getDistance} from 'geolib'
import {activateLocation, deactivateLocation} from './store/locations'



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


