const ADD_ACTIVITY = 'LifestyleCompanion/activities/ADD_ACTIVITY';
const REMOVE_ACTIVITY = 'LifestyleCompanion/activities/REMOVE_ACTIVITY';

export function addActivity(payload) {
  return {
    type: ADD_ACTIVITY,
    payload
  }
}

export function removeActivity(payload) {
  return {
    type: REMOVE_ACTIVITY,
    payload
  }
}

const dummyState = [
  {
    activityName: 'Running',
    date: new Date(2014, 8, 1, 10, 19, 50)
  },
  {
    activityName: 'Swimming',
    date: new Date(2015, 9, 1, 11, 20, 51)
  },
  {
    activityName: 'Reading',
    date: new Date(2016, 10, 3, 12, 21, 52)
  }
];

export default function activities(state = dummyState, action) {
  switch(action.type) {
    case ADD_ACTIVITY:
      return [
        ...state,
        action.payload
      ]
    case REMOVE_ACTIVITY:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    default:
      return state;
  }
}
