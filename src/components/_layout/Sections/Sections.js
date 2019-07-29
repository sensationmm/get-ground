import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import './sections.scss';

/**
* Sections
* Displays an array of text content in staggered left/right alignment
* @param {object} props - props object
* @return {JSXElement} - Sections component
*/
const Sections = (props) => {
  const { sections, reverse, imageFull } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-sections" className={classNames('sections', { reversed: reverse })}>
    {sections.map((section, count) => <Section imageFull={imageFull} key={`section-${count}`} {...section} t={t} /> )}
    </div>
  );
}

/**
 * Section
 * Renders a section
 */
class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  render() {
    const { heading, text, image, more, t, imageFull, button } = this.props;
    const { expanded } = this.state;

    return (
      <div className="section">
        <div className="section-inner">
          <div className="section-text">
            <h2>{heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: <p>{ text } </p> }} />

            {more && 
              <p className="section-expand" onClick={() => this.setState({ expanded: !expanded })}>
                { expanded ? t('seeLess') : t('seeMore') }
              </p>
            }

            {button && button}
          </div>

          <div className={classNames('section-image', { jsx: typeof image !== 'string' }, { imageFull: imageFull })}>
            {typeof image === 'string'
              ? <img src={image} />
              : image
            }
          </div>
        </div>

        {more && expanded && <div className="section-more" dangerouslySetInnerHTML={{ __html: more }} />}
      </div>
    )
  }
}

Sections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.object,
      more: PropTypes.string,
      t: PropTypes.func
    })
  ),
  reverse: PropTypes.bool,
  imageFull: PropTypes.bool
};

Sections.defaultProps = {
  reverse: false,
  imageFull: false
};

Section.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  more: PropTypes.string,
  t: PropTypes.func,
  imageFull: PropTypes.bool,
  button: PropTypes.object
};

export default Sections;
