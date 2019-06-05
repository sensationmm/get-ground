import { combineReducers } from 'redux';
import { loader } from './loader';
import { layout } from './layout';
import { modal } from './modal';
import { user } from './user';
import { auth } from './auth';
import { idCheck } from './idCheck';
import { form } from './form';
import { actions } from './actions';
import { companies } from './companies';
import { activeCompany } from './activeCompany';
import { additionalServices } from './additionalServices';

export default combineReducers({
  actions,
  activeCompany,
  additionalServices,
  auth,
  companies,
  form,
  idCheck,
  layout,
  loader,
  modal,
  user
});
