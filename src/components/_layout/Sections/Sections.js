import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './sections.scss';

/**
* Sections
* Displays an array of text content in staggered left/right alignment
* @param {object} props - props object
* @return {JSXElement} - Sections component
*/
const Sections = (props) => {
  const { sections } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-sections" className="sections">
    {sections.map((section, count) => <Section key={`section-${count}`} {...section} t={t} /> )}
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
    const { heading, text, image, more, t } = this.props;
    const { expanded } = this.state;

    return (
      <div className="section">
        <div className="section-inner">
          <div className="section-text">
            <h2>{heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />

            {more && 
              <p className="section-expand" onClick={() => this.setState({ expanded: !expanded })}>
                { expanded ? t('seeLess') : t('seeMore') }
              </p>
            }
          </div>

          <div className="section-image">
            <img src={image} />
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
  )
};

Section.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  more: PropTypes.string,
  t: PropTypes.func
};

export default Sections;
