import { combineReducers } from 'redux';
import activities from './activities';
import notifications from './notifications';

export default combineReducers({
  activities,
  notifications,
});
