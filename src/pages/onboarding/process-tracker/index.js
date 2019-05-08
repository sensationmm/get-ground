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
    const sectionsConfig = {
      sections: [
        {
          'title': sectionsContent['step1'].title,
          'imageAltText': sectionsContent['step1'].imageAltText,
          'copy': sectionsContent['step1'].copy,
          'path': '/create-account',
          'status': 'complete',
          'image': Image,
        },
        {
          'title': sectionsContent['step2'].title,
          'imageAltText': sectionsContent['step2'].imageAltText,
          'copy': sectionsContent['step2'].copy,
          'path': '/personal-details',
          'status': 'incomplete',
          'image': Image,
        },
        {
          'title': sectionsContent['step3'].title,
          'imageAltText': sectionsContent['step3'].imageAltText,
          'copy': sectionsContent['step3'].copy,
          'path': '/id-check',
          'status': 'incomplete',
          'image': Image,
        },
        {
          'title': sectionsContent['step4'].title,
          'imageAltText': sectionsContent['step4'].imageAltText,
          'copy': sectionsContent['step4'].copy,
          'path': '/compliance-check',
          'status': 'to_do',
          'image': Image,
        },
        {
          'title': sectionsContent['step5'].title,
          'imageAltText': sectionsContent['step5'].imageAltText,
          'copy': sectionsContent['step5'].copy,
          'path': '/payment',
          'status': 'to_do',
          'image': Image,
        }
      ]
    };

      return (
        <Fragment>
            <Layout>
              <div className="process-tracker" role="fullscreen">
                <h3 className="process-tracker--title">{t('onBoarding.progressTracker.inProgressTitle')}</h3>
                <div className="process-tracker-sections">
                  {sectionsConfig.sections.map((section, idx) => <ProcessSection key={`${idx} + ${section.title}`} {...section} />)}
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