/* eslint-disable react/prefer-stateless-function */
/* eslint-disable require-jsdoc */
import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import Checkbox from 'src/components/_form/Checkbox/Checkbox'
import Button from 'src/components/_buttons/Button/Button'

import './process-tracker.scss'

/**
 * ProcessTracker
 *
 * @return {JSXElement} ProcessTracker
 */

class ProcessTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false
    }
  }

  render() {
    const { t, i18n } = this.props;
    const sectionsContent = i18n.t('onBoarding.progressTracker.sections', { returnObjects: true });

      return (
        <Fragment>
            <Layout>
              <div className="process-tracker" role="fullscreen">
                <h3 className="process-tracker--title">{t('onBoarding.progressTracker.inProgressTitle')}</h3>
                <div className="process-tracker-sections">
                  {sectionsContent.map((section, idx) => <ProcessSection key={`${idx} + ${section.title}`} {...section} />)}
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
