import { combineReducers } from 'redux';
import { loader } from './loader'
import { modal } from './modal';
import { layout } from './layout'

export default combineReducers({ layout, modal, loader });
