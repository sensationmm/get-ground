import { combineReducers } from 'redux';
import { loader } from './loader';
import { layout } from './layout';
import { modal } from './modal';
import { user } from './user';
import { auth } from './auth';

export default combineReducers({ 
  layout,
  modal,
  loader,
  user,
  auth
});
