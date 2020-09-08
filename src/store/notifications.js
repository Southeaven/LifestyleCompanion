import { RESET_STORE } from './debug';

const SET_ACTIVITY_NOTIFICATION = 'LifestyleCompanion/notifications/SET_ACTIVITY_NOTIFICATION';

export function setActivityNotification(payload) {
  return {
    type: SET_ACTIVITY_NOTIFICATION,
    payload
  }
}

const dummyState = {
  addActivity: false
};

export default function notifications(state = dummyState, action) {
  switch(action.type) {
    case SET_ACTIVITY_NOTIFICATION:
      return {
        ...state,
        addActivity: action.payload
      }
    case RESET_STORE:
      return dummyState;
    default:
      return state;
  }
}
