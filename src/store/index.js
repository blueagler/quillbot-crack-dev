import { createStore, combineReducers } from 'redux';
import snackbar from './snackbar/reducer';
import dialog from './dialog/reducer';

export default createStore(combineReducers({ snackbar, dialog }));