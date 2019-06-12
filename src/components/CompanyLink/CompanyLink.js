import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import './company-link.scss';

/**
* CompanyLink
* Wrapper component to display formatted company link
*
* @param {object} company - company information, comprising:
*   @param {string} id - ID of company data object
*   @param {object} address - company address info
*/

const CompanyLink = props => {
  const { company: { id, address }, setActiveCompany } = props;


  return (
    <div 
      data-test="component-company-link" 
      className="company-link"
      onClick={() => { setActiveCompany(id); navigate('/dashboard/company'); }}
    >
      {address.premise}, {address.postcode}
    </div>
  );
};

CompanyLink.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.object
  }),
  setActiveCompany: PropTypes.func
};

export default CompanyLink;
