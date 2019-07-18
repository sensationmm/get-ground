import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ActionButton from 'src/components/ActionBox/ActionButton';

import './to-do.scss';

/**
* ToDo
* Action to do component
*
* @param {object} company - company information, comprising:
*   @param {string} id - ID of company data object
*   @param {object} property_address - company address info
* @param {object} action - action object, comprising:
*   @param {string} type - type of action
*   @param {string} companyID - company action relates to
* @param {function} setActiveCompany - action dispatcher to set company id
*/

const ToDo = props => {
  const { action, company: { id, property_address }, setActiveCompany } = props;
  const [t] = useTranslation();
  
  return (
    <div 
      data-test="component-todo" 
      className="to-do"
      onClick={() => setActiveCompany(id)}
    >
      {property_address.address.premise
        ? <div>
          <div className="to-do-address">{property_address.address.premise}</div>
          <div className="to-do-postcode">{ property_address.address.postcode }</div>
        </div>
        : <div className="to-do-address">{ t('actionBox.actions.complete_company.label')}</div>
      }

      <ActionButton alert={action} />
    </div>
  );
};

ToDo.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
    property_address: PropTypes.object
  }),
  setActiveCompany: PropTypes.func,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    companyID: PropTypes.number
  })
};

export default ToDo;
