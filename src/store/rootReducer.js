import { combineReducers } from 'redux';
import activities from './activities';
import notifications from './notifications';
import locations from './locations';
import works from './works'

export default combineReducers({
  activities,
  notifications,
  locations,
  works
});
