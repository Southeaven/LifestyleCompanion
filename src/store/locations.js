import uuid from 'react-native-uuid';

const ADD_LOCATION = 'LifestyleCompanion/locations/ADD_LOCATION';
const REMOVE_LOCATION = 'LifestyleCompanion/locations/REMOVE_LOCATION';
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

const dummyState = [
  {
    id: uuid.v4(),
    longitude: 18.566,
    latitude: 12.152,
    range: 20,
    activity: "Activity"
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
  switch(action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        prepareActionPayload(action.payload, true),
      ];
    case REMOVE_LOCATION:
      console.log(action.payload)
      return [
        ...state.slice(0, state.indexOf(action.payload)),
        ...state.slice(state.indexOf(action.payload) + 1)
      ];
    case RESET_STORE:
      return [];
    default:
      return state;
  }
}
