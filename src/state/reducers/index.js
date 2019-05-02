import { combineReducers } from 'redux';
import { loader } from './loader'
import { modal } from './modal';

export default combineReducers({ 
  loader,
  modal
});
