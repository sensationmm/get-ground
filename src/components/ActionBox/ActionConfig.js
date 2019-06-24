import { navigate } from 'gatsby';
import { setActiveCompany } from 'src/state/actions/activeCompany';
import store from 'src/state/store';

/**
 * ActionConfig
 * Generates label/action/cta props based on passed action type
 * @param {object} alert - action to set up, comprising:
 *   @param {string} type - type of action
 *   @param {string} companyID - company action relates to
 * @return {object} labels, button text and onClick event for action
 */
const ActionConfig = (alert) => {
  let label = '', labelShort = '', cta = '', action = null;
  
  switch(alert.type) {
    case 'documents_ready':
      label = 'actionBox.actions.documents_ready.label';
      labelShort = 'actionBox.actions.documents_ready.labelShort';
      cta = 'actionBox.actions.documents_ready.cta';
      action = () => {
        store.dispatch(setActiveCompany(alert.companyID));
        navigate('/documents');
      };
      break;
    case 'prompt_shareholders':
      label = 'actionBox.actions.prompt_shareholders.label';
      labelShort = 'actionBox.actions.prompt_shareholders.labelShort';
      cta = 'actionBox.actions.prompt_shareholders.cta';
      action = () => {
        store.dispatch(setActiveCompany(alert.companyID));
        navigate('/documents/prompt');
      };
      break;
    case 'directors_insurance':
      label = 'actionBox.actions.directors_insurance.label';
      labelShort = 'actionBox.actions.directors_insurance.labelShort';
      cta = 'actionBox.actions.directors_insurance.cta';
      action = () => {
        store.dispatch(setActiveCompany(alert.companyID));
        navigate('/company-design/payment');
      };
      break;
    case 'add_company': 
    default:
      label = 'actionBox.actions.add_company.label';
      labelShort = 'actionBox.actions.add_company.labelShort';
      cta = 'actionBox.actions.add_company.cta';
      action = () => {
        navigate('/company-design/intro');
      };
      break;
  }

  return { label, labelShort, cta, action };
}

export default ActionConfig;
