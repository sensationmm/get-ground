import { combineReducers } from 'redux';
import { loader } from './loader';
import { layout } from './layout';
import { modal } from './modal';
import { user } from './user';
import { auth } from './auth';
import { idCheck } from './idCheck';

export default combineReducers({
  auth,
  idCheck,
  layout,
  loader,
  modal,
  user
});
