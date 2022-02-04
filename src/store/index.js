import { createStore, combineReducers } from 'redux';
import snackbar from './snackbar/reducer';
import dialog from './dialog/reducer';
import remoteConfig from './remoteConfig/reducer';

export default createStore(combineReducers({ snackbar, dialog, remoteConfig }));