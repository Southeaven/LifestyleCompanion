import uuid from 'react-native-uuid';

const ADD_WORK = 'LifestyleCompanion/works/ADD_WORK';
const REMOVE_WORK = 'LifestyleCompanion/works/REMOVE_WORK';

import { RESET_STORE } from './debug';


export function addWork(payload) {
  return {
    type: ADD_WORK,
    payload
  }
}

export function removeWork(payload) {
  return {
    type: REMOVE_WORK,
    payload
  }
}



export default function works(state = [], action) {
  switch (action.type) {
    case ADD_WORK:
      return [
        ...state,
        action.payload,
      ];
    case REMOVE_WORK:
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
