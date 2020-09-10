import uuid from 'react-native-uuid';

const ADD_LOCATION = 'LifestyleCompanion/locations/ADD_LOCATION';
const REMOVE_LOCATION = 'LifestyleCompanion/locations/REMOVE_LOCATION';
const ACTIVATE_LOCATION = 'LifestyleCompanion/locations/ACTIVATE_LOCATION';
const DEACTIVATE_LOCATION = 'LifestyleCompanion/locations/DEACTIVATE_LOCATION';
import { RESET_STORE } from './debug';

export function addLocation(payload) {
  return {
    type: ADD_LOCATION,
    payload
  }
}

export function removeLocation(payload) {
  return {
    type: REMOVE_LOCATION,
    payload
  }
}

export function activateLocation(id) {
  return{
    type: ACTIVATE_LOCATION,
    id
  }
}

export function deactivateLocation(id) {
  return{
    type: DEACTIVATE_LOCATION,
    id
  }
}

const dummyState = [
  {
    id: uuid.v4(),
    longitude: 18.566,
    latitude: 12.152,
    range: 20,
    activity: "Activity",
    active: false
  }
];

function prepareActionPayload(payload) {
  return {
    id: uuid.v4(),
    longitude: payload.longitude,
    latitude: payload.latitude,
    range: payload.range,
    activity: payload.activity
  };
}

export default function locations(state = dummyState, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        prepareActionPayload(action.payload, true),
      ];
    case REMOVE_LOCATION:
      return [
        ...state.slice(0, state.indexOf(action.payload)),
        ...state.slice(state.indexOf(action.payload) + 1)
      ];
    case ACTIVATE_LOCATION:
      for (let i=0; i<state.length; i++){
        if (state[i].id == state[i].id)
          state[i].active = true
      }
      return state;
    case DEACTIVATE_LOCATION:
      for (let i=0; i<state.length; i++){
        if (state[i].id == state[i].id)
          state[i].active = false
      }
      return state;
    case RESET_STORE:
      return [];
    default:
      return state;
  }
}
