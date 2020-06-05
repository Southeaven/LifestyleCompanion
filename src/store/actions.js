import * as actionTypes from './actionTypes';

export function addActivity(payload) {
  return {
    type: actionTypes.ADD_ACTIVITY,
    payload
  }
}

export function removeActivity(payload) {
  return {
    type: actionTypes.REMOVE_ACTIVITY,
    payload
  }
}
