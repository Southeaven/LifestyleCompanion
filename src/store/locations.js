import uuid from 'react-native-uuid';

const ADD_LOCATION = 'LifestyleCompanion/locations/ADD_LOCATION';
const REMOVE_LOCATION = 'LifestyleCompanion/locations/REMOVE_LOCATION';
const ACTIVATE_LOCATION = 'LifestyleCompanion/locations/ACTIVATE_LOCATION';
const DEACTIVATE_LOCATION = 'LifestyleCompanion/locations/DEACTIVATE_LOCATION';
import { RESET_STORE } from './debug';
import { store } from '../App'
import { addActivityRange } from './activities'

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

function prepareActionPayload(payload) {
  return {
    id: uuid.v4(),
    longitude: payload.longitude,
    latitude: payload.latitude,
    range: payload.range,
    activity: payload.activity,
    active: false,
    activationDate: null
  };
}


export default function locations(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        prepareActionPayload(action.payload),
      ];
    case REMOVE_LOCATION:
      return [
        ...state.slice(0, state.indexOf(action.payload)),
        ...state.slice(state.indexOf(action.payload) + 1)
      ];
    case ACTIVATE_LOCATION:
      for (let i=0; i<state.length; i++){
        if (state[i].id === action.id){
          state[i].active = true
          state[i].activationDate = new Date()
        }
      }
      return state;
    case DEACTIVATE_LOCATION:
      console.log(store.getState().activities)
      for (let i=0; i<state.length; i++){
        if (state[i].id === action.id){
          if(state[i].active){
            state[i].active = false
            store.dispatch(addActivityRange({
              activityName: state[i].activity,
              firstDate: state[i].activationDate,
              secondDate: new Date()
            }))
            console.log({
              activityName: state[i].activity,
              firstDate: state[i].activationDate,
              secondDate: new Date()
            })
          }
        }
      }
      return state;
    case RESET_STORE:
      return [];
    default:
      return state;
  }
}
