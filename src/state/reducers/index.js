import { combineReducers } from 'redux';
import { loader } from './loader';
import { layout } from './layout';
import { user } from './user';
import { auth } from './auth';

export default combineReducers({ 
  layout,
  loader,
  user,
  auth
});
