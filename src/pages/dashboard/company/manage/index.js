import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';
import { companyModel } from 'src/state/reducers/companies';

import '../company-overview.scss';

/**
 * Manage
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} BankAccount
 */
class Manage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveChatTopic: null
    };
  }

  /**
   * setTopic
   * sets chosen live chat topic in state
   * @param {string} topic - topic to set
   * @return {void}
   */
  setTopic = (topic) => {
    this.setState({ liveChatTopic: topic });
  }

  render() {
    const { t, companies, activeCompany } = this.props;
    const { liveChatTopic } = this.state;

    const company = activeCompany !== null ? companies[activeCompany] : companyModel;

    return (
      <Layout secure companyID>
        <div className="company-overview has-hero-button" data-test="component-manage-company">
          <div className="company-header link" onClick={() => navigate('/dashboard/company')}>
            { company.address.premise }, { company.address.postcode }
          </div>

          <h1>{ t('dashboard.company.manage.title') }</h1>
          <p>{ t('dashboard.company.manage.text') }</p>

          <br />

          <p><b>{ t('dashboard.company.manage.select') }</b></p>
      
          <OptionSelect
            options={[
              { id: 'buyShares', title: t('dashboard.company.manage.options.buyShares') },
              { id: 'lendMoney', title: t('dashboard.company.manage.options.lendMoney') },
              { id: 'withdrawDividend', title: t('dashboard.company.manage.options.withdrawDividend') },
              { id: 'loanRepayment', title: t('dashboard.company.manage.options.loanRepayment') },
              { id: 'allotShares', title: t('dashboard.company.manage.options.allotShares') },
              { id: 'appointDirector', title: t('dashboard.company.manage.options.appointDirector') },
              { id: 'removeDirector', title: t('dashboard.company.manage.options.removeDirector') },
              { id: 'delist', title: t('dashboard.company.manage.options.delist') },
              { id: 'dissolveCompany', title: t('dashboard.company.manage.options.dissolveCompany') },
            ]}
            onChange={this.setTopic}
            selected={liveChatTopic}
            small
            center
          />

          <div className="hero-button">
            <Button
              data-test="live-chat-button"
              classes="chat"
              label={ t('liveChat.button') }
              onClick={() => {}}
              disabled={!liveChatTopic}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies
});

Manage.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.number,
  t: PropTypes.func.isRequired
};

export const RawComponent = Manage;

export default connect(mapStateToProps, null)(withTranslation()(Manage));
