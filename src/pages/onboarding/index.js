import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

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
          'path': '/onboarding/create-account',
          'status': 'complete',
          'image': Image,
        },
        {
          'title': sectionsContent['step2'].title,
          'imageAltText': sectionsContent['step2'].imageAltText,
          'copy': sectionsContent['step2'].copy,
          'path': '/onboarding/personal-details',
          'status': 'incomplete',
          'image': Image,
        },
        {
          'title': sectionsContent['step3'].title,
          'imageAltText': sectionsContent['step3'].imageAltText,
          'copy': sectionsContent['step3'].copy,
          'path': '/onboarding/id-check',
          'status': 'incomplete',
          'image': Image,
        }
      ]
    };

      return (
        <Fragment>
            <Layout secure>
              <div className="process-tracker" role="fullscreen">
                <h3 className="process-tracker--title">{t('onBoarding.progressTracker.inProgressTitle')}</h3>
                <div className="process-tracker-sections">
                  {sectionsConfig.sections.map((section, idx) => <ProcessSection key={`${idx} + ${section.title}`} {...section} />)}
                </div>
                <Checkbox label={t('onBoarding.progressTracker.confirmComplete')} checked={this.state.checkbox} onChange={() => this.setState({checkbox: !this.state.checkbox})} />
                <Button classes="primary" fullWidth onClick={() => navigate('/company-design')} />
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
