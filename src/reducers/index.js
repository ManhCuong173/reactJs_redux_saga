import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modal from './modal';
import tasks from './tasks';
import uis from './ui';

const rootReducer = combineReducers({
  tasks,
  uis,
  modal,
  form: formReducer,
});

export default rootReducer;
