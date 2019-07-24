import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Element, scroller } from 'react-scroll';

import CanvasCurve from 'src/components/_layout/CanvasCurve';
import ButtonIcon from 'src/components/_buttons/ButtonIcon/ButtonIcon';

import ChevronDown from 'src/assets/images/chevron-down-white.svg';

import './page-header.scss';

/**
* PageHeader
* Wrapper component to display a set of form elememts
* @param {object} props - props object
* @return {JSXElement} - PageHeader component
*/
const PageHeader = (props) => {
  const { title, text } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-page-header" className="page-header">
      <div className="page-header-content">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />

        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      <CanvasCurve />

      <div className="page-header-scroll">
        { t('scroll') }

        <ButtonIcon icon={ChevronDown} liveChat onClick={() => scroller.scrollTo('content', { smooth: true, offset: 50, duration: 500 })} />
      </div>

      <Element id="content" />
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]),
};

export default PageHeader;
