import * as actionTypes from './actionTypes';

export function activities(state = [], action) {
  switch(action.type) {
    case actionTypes.ADD_ACTIVITY:
      return [
        ...state,
        action.payload
      ]
    case actionTypes.REMOVE_ACTIVITY:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    default:
      return state;
  }
}
