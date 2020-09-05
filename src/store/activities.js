import uuid from 'react-native-uuid';
import {
  getMinutes,
  setMinutes,
  setSeconds,
} from 'date-fns';

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
    id: uuid.v4(),
    activityName: 'Eating',
    date: new Date(2013, 7, 1, 9, 8, 49),
    timeslot: new Date(2013, 7, 1, 9, 0, 0),
  },
  {
    id: uuid.v4(),
    activityName: 'Running',
    date: new Date(2014, 8, 1, 10, 19, 50),
    timeslot: new Date(2014, 8, 1, 10, 15, 0),
  },
  {
    id: uuid.v4(),
    activityName: 'Swimming',
    date: new Date(2015, 9, 1, 11, 31, 51),
    timeslot: new Date(2015, 9, 1, 11, 30, 0),
  },
  {
    id: uuid.v4(),
    activityName: 'Reading',
    date: new Date(2016, 10, 3, 12, 47, 52),
    timeslot: new Date(2016, 10, 3, 12, 45, 0),
  }
];

function processSingleDate(date) {
  const minutes = getMinutes(date);
  let closestMinutes = 0;

  if (minutes > 45) {
    closestMinutes = 45;
  } else if (minutes > 30) {
    closestMinutes = 30;
  } else if (minutes > 15) {
    closestMinutes = 15;
  }

  return setSeconds(setMinutes(new Date(date), closestMinutes), 0);
}

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

export default function activities(state = dummyState, action) {
  switch(action.type) {
    case ADD_ACTIVITY:
      return [
        ...state,
        {
          ...action.payload,
          id: uuid.v4(),
          timeslot: processSingleDate(action.payload.date)
        }
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
