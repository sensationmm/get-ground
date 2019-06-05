import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from 'src/components/ActionBox/ActionButton';

import './to-do.scss';

/**
* ToDo
* Action to do component
*
* @param {object} company - company information, comprising:
*   @param {string} id - ID of company data object
*   @param {string} name - name of company
*   @param {object} address - company address info
* @param {object} action - action object, comprising:
*   @param {string} type - type of action
*   @param {string} companyID - company action relates to
* @param {function} setActiveCompany - action dispatcher to set company id
*/

const ToDo = props => {
  const { action, company: { id, name, address }, setActiveCompany } = props;

  return (
    <div 
      data-test="component-todo" 
      className="to-do"
      onClick={() => setActiveCompany(id)}
    >
      <div>
        <h4>{name}</h4>
        {address.premise}, {address.postcode}
      </div>

      <ActionButton alert={action} />
    </div>
  );
};

ToDo.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.object
  }),
  setActiveCompany: PropTypes.func,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    companyID: PropTypes.string
  })
};

export default ToDo;
