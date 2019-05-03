import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import Checkbox from 'src/components/_form/Checkbox/Checkbox'
import Button from 'src/components/_buttons/Button/Button'
import Image from 'src/assets/images/person.svg'

import './process-tracker.scss'

/**
 * ProcessTracker
 * @author Ravin Patel
 * @class
 * @return {ReactComponent} ProcessTracker
 */
export class ProcessTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false
    }
  }

  render() {
    const { t, i18n } = this.props;
    const sectionsContent = i18n.t('onBoarding.progressTracker.sections', { returnObjects: true });
    const sections = [
        {
          'title': sectionsContent[0].title,
          'imageAltText': sectionsContent[0].imageAltText,
          'copy': sectionsContent[0].copy,
          'path': sectionsContent[0].path,
          'status': 'complete',
          'image': Image,
        },
        {
          'title': sectionsContent[1].title,
          'imageAltText': sectionsContent[1].imageAltText,
          'copy': sectionsContent[1].copy,
          'path': sectionsContent[1].path,
          'status': 'incomplete',
          'image': Image,
        },
        {
          'title': sectionsContent[2].title,
          'imageAltText': sectionsContent[2].imageAltText,
          'copy': sectionsContent[2].copy,
          'path': sectionsContent[2].path,
          'status': 'incomplete',
          'image': Image,
        },
        {
          'title': sectionsContent[3].title,
          'imageAltText': sectionsContent[3].imageAltText,
          'copy': sectionsContent[3].copy,
          'path': sectionsContent[3].path,
          'status': 'to_do',
          'image': Image,
        },
        {
          'title': sectionsContent[4].title,
          'imageAltText': sectionsContent[4].imageAltText,
          'copy': sectionsContent[4].copy,
          'path': sectionsContent[4].path,
          'status': 'to_do',
          'image': Image,
        }
      ];

      return (
        <Fragment>
            <Layout>
              <div className="process-tracker" role="fullscreen">
                <h3 className="process-tracker--title">{t('onBoarding.progressTracker.inProgressTitle')}</h3>
                <div className="process-tracker-sections">
                  {sections.map((section, idx) => <ProcessSection key={`${idx} + ${section.title}`} {...section} />)}
                </div>
                <Checkbox label={t('onBoarding.progressTracker.confirmComplete')} checked={this.state.checkbox} onChange={() => this.setState({checkbox: !this.state.checkbox})} />
                <Button classes="primary" fullWidth/>
              </div>
            </Layout>
          </Fragment>
      );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader,
});

ProcessTracker.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(withTranslation()(ProcessTracker))
