import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';

import ButtonIcon from 'src/components/_buttons/ButtonIcon/ButtonIcon';

import ChevronPrev from 'src/assets/images/chevron-left-white.svg';
import ChevronNext from 'src/assets/images/chevron-right-white.svg';

import './links.scss';

/**
* Links
* Wrapper component to display a set of form elememts
* @param {object} props - props object
* @return {JSXElement} - PageHeader component
*/
const Links = (props) => {
  const { prev, next } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-links" className="links">
      <div className="links-link" onClick={() => navigate(prev.link)}>
        <ButtonIcon icon={ChevronPrev} />
        <div className="links-link-label">
          <b>{ prev.label }</b>
          <span className="links-link-more">{ t('findOutMore.label') }</span>
        </div>
      </div> 

      <div className="links-link" onClick={() => navigate(next.link)}>
        <div className="links-link-label">
          <b>{ next.label }</b>
          <span className="links-link-more">{ t('findOutMore.label') }</span>
        </div>
        <ButtonIcon icon={ChevronNext} />
      </div>
    </div>
  );
}

Links.propTypes = {
  prev: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string
  }), 
  next: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string
  })
};

export default Links;
