import uuid from 'react-native-uuid';
import {
  getMinutes,
  setMinutes,
  setSeconds,
} from 'date-fns';

const ADD_ACTIVITY = 'LifestyleCompanion/activities/ADD_ACTIVITY';
const ADD_ACTIVITY_RANGE = 'LifestyleCompanion/activities/ADD_ACTIVITY_RANGE';
const REMOVE_ACTIVITY = 'LifestyleCompanion/activities/REMOVE_ACTIVITY';

export function addActivity(payload) {
  return {
    type: ADD_ACTIVITY,
    payload
  }
}

export function addActivityRange(payload) {
  return {
    type: ADD_ACTIVITY_RANGE,
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
    id: uuid.v4(),
    activityName: 'Eating',
    firstDate: new Date(2013, 7, 1, 9, 8, 49),
    secondDate: new Date(2013, 7, 1, 9, 8, 49),
    startDate: new Date(2013, 7, 1, 9, 0, 0),
    stopDate: new Date(2013, 7, 1, 9, 14, 59),
  },
  {
    id: uuid.v4(),
    activityName: 'Running',
    firstDate: new Date(2014, 8, 1, 10, 19, 50),
    secondDate: new Date(2014, 8, 1, 10, 19, 50),
    startDate: new Date(2014, 8, 1, 10, 15, 0),
    stopDate: new Date(2014, 8, 1, 10, 29, 59),
  },
  {
    id: uuid.v4(),
    activityName: 'Swimming',
    firstDate: new Date(2015, 9, 1, 11, 31, 51),
    secondDate: new Date(2015, 9, 1, 11, 31, 51),
    startDate: new Date(2015, 9, 1, 11, 30, 0),
    stopDate: new Date(2015, 9, 1, 11, 44, 59),
  },
  {
    id: uuid.v4(),
    activityName: 'Reading',
    firstDate: new Date(2016, 10, 3, 12, 47, 52),
    secondDate: new Date(2016, 10, 3, 12, 47, 52),
    startDate: new Date(2016, 10, 3, 12, 45, 0),
    stopDate: new Date(2016, 10, 3, 12, 59, 59),
  }
];

function processPairOfDates(date1, date2) {
  const minutesDate1 = getMinutes(date1);
  const minutesDate2 = getMinutes(date2);
  let closestMinutes = 0;
  let farthestMinutes = 14;

  if (minutesDate1 > 45) {
    closestMinutes = 45;
  } else if (minutesDate1 > 30) {
    closestMinutes = 30;
  } else if (minutesDate1 > 15) {
    closestMinutes = 15;
  }

  if (minutesDate2 > 45) {
    farthestMinutes = 59;
  } else if (minutesDate2 > 30) {
    farthestMinutes = 44;
  } else if (minutesDate2 > 15) {
    farthestMinutes = 29;
  }

  return {
    startDate: setSeconds(setMinutes(new Date(date1), closestMinutes), 0),
    stopDate: setSeconds(setMinutes(new Date(date2), farthestMinutes), 59),
  }
}

function prepareActionPayload(payload, isSingle) {
  const { startDate, stopDate } = processPairOfDates(payload.firstDate, isSingle ? payload.firstDate : payload.secondDate);

  return {
    id: uuid.v4(),
    activityName: payload.activityName,
    firstDate: payload.firstDate,
    secondDate: isSingle ? payload.firstDate : payload.secondDate,
    startDate,
    stopDate,
  };
}

export default function activities(state = dummyState, action) {
  switch(action.type) {
    case ADD_ACTIVITY:
      return [
        ...state,
        prepareActionPayload(action.payload, true),
      ]
    case ADD_ACTIVITY_RANGE:
      return [
        ...state,
        prepareActionPayload(action.payload, false),
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
