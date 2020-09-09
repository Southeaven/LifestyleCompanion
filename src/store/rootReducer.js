import { combineReducers } from 'redux';
import activities from './activities';
import notifications from './notifications';
import locations from './locations';

export default combineReducers({
  activities,
  notifications,
  locations,
});
