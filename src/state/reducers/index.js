import { combineReducers } from 'redux';
import { loader } from './loader'
import { layout } from './layout'

export default combineReducers({ layout, loader });
