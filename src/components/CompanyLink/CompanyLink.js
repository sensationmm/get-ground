import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import './company-link.scss';

/**
* CompanyLink
* Wrapper component to display formatted company link
*
* @param {object} company - company information, comprising:
*   @param {number} id - ID of company data object
*   @param {object} property_address - company address info
*/

const CompanyLink = props => {
  const { company: { id, property_address, progress }, setActiveCompany } = props;

  return (
    <div 
      data-test="component-company-link" 
      className="company-link"
      onClick={() => { 
        setActiveCompany(id); 
        progress.overall_status === 'COMPLETE' ? navigate('/dashboard/company') : navigate('/company-design');
      }}
    >
      {property_address.address.premise} {property_address.address.street}, {property_address.address.postcode}
    </div>
  );
};

CompanyLink.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
    property_address: PropTypes.object,
    progress: PropTypes.object
  }),
  setActiveCompany: PropTypes.func
};

export default CompanyLink;
