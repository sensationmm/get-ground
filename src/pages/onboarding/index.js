import React, { Fragment, Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import Checkbox from 'src/components/_form/Checkbox/Checkbox'
import Button from 'src/components/_buttons/Button/Button'

import IconAccountDetails from 'src/assets/images/onboarding-account-details.svg'
import IconPersonalDetails from 'src/assets/images/onboarding-personal-details.svg'
import IconIDCheck from 'src/assets/images/onboarding-id-check.svg'

import './process-tracker.scss'

import { showLoader, hideLoader } from 'src/state/actions/loader';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

/**
 * ProcessTracker
 * @author Ravin Patel
 * @class
 * @return {ReactComponent} ProcessTracker
 */
export class ProcessTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false
    }
  }

  componentDidMount() {
    this.getProgress();
  }

  // componentDidUpdate(prevProps) {
  //   const { isLoading } = this.props;

  //   if(!isLoading && isLoading !== prevProps.isLoading) {
  //     this.getProgress();
  //   }
  // }

  getProgress = () => {
    const { userID, showLoader, hideLoader } = this.props;

    showLoader();

    if(userID) {
      AccountService.getUser(userID).then(() => {
        hideLoader();
      });
    }
  }

  completeOnboarding = () => {
    const { showLoader, hideLoader } = this.props;

    showLoader();

    AccountService.completeOnboarding().then(() => {
      hideLoader();
      navigate('/onboarding/confirmation')
    });
  }

  render() {
    const { t, i18n, progress } = this.props;
    const sectionsContent = i18n.t('onBoarding.progressTracker.sections', { returnObjects: true });
    const sectionsConfig = {
      sections: [
        {
          'title': sectionsContent['step1'].title,
          'imageAltText': sectionsContent['step1'].imageAltText,
          'copy': sectionsContent['step1'].copy,
          'path': '/onboarding/create-account',
          'status': progress && progress.account_details_status,
          'image': IconAccountDetails,
        },
        {
          'title': sectionsContent['step2'].title,
          'imageAltText': sectionsContent['step2'].imageAltText,
          'copy': sectionsContent['step2'].copy,
          'path': '/onboarding/personal-details',
          'status': progress && progress.personal_details_status,
          'image': IconPersonalDetails,
        },
        {
          'title': sectionsContent['step3'].title,
          'imageAltText': sectionsContent['step3'].imageAltText,
          'copy': sectionsContent['step3'].copy,
          'path': '/onboarding/id-check',
          'status': progress && progress.id_check_status,
          'image': IconIDCheck,
          'isDisabled': progress && progress.personal_details_status !== 'COMPLETE'
        }
      ]
    };

    if(this.props.last_page_visited === 'dashboard') {
      navigate('/dashboard');
    }

    return (
      <Fragment>
        <Layout secure>
          <div className="process-tracker onboarding" role="fullscreen account">
            <h3 className="process-tracker--title">{t('onBoarding.progressTracker.inProgressTitle')}</h3>
            <div className="process-tracker-sections">
              {sectionsConfig.sections.map((section, idx) => {
                return (
                  <ProcessSection 
                    key={`${idx} + ${section.title}`}
                    {...section}
                  />
                )
              })}
            </div>

            {progress && progress.id_check_status === 'COMPLETE' &&
              <div>
                <Checkbox
                  label={t('onBoarding.progressTracker.confirmComplete')}
                  checked={this.state.checkbox}
                  onChange={() => this.setState({checkbox: !this.state.checkbox})}
                />

                <Button
                  classes="primary"
                  fullWidth
                  onClick={this.completeOnboarding}
                  disabled={!this.state.checkbox}
                />
              </div>
            }
          </div>
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader,
  last_page_visited: state.user.last_page_visited,
  userID: state.user.id,
  progress: state.user.progress
});

const actions = { showLoader, hideLoader };

ProcessTracker.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  progress: PropTypes.object,
  isLoading: PropTypes.bool,
  userID: PropTypes.number,
  last_page_visited: PropTypes.string
};

export const RawComponent = ProcessTracker;

export default connect(mapStateToProps, actions)(withTranslation()(ProcessTracker))
