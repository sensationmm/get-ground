import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import functions from 'src/utils/functions';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';

import '../company-overview.scss';

/**
 * Manage
 * @author Kevin Reynolds
 * @param {string} liveChatTopic - topic to be passed to live chat
 * @param {object} props - for JSDoc
 * @return {ReactComponent} BankAccount
 */
class Manage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveChatTopic: null,
      hasLoaded: false,
      address: ''
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

  handleLiveChat = (liveChatTopic) => {
    const custom_variables = [
      { name: 'manage my company topic', value: liveChatTopic },
    ];
    if(window) {
      window.LC_API.set_custom_variables(custom_variables);
      window.LC_API.open_chat_window()
    }
  }

  render() {
    const { t, companies, activeCompany } = this.props;
    const { liveChatTopic, hasLoaded, address } = this.state;

    if ( activeCompany && !hasLoaded ) {
      const companyData = functions.getByValue(companies, 'id', activeCompany);
      this.setState({
        hasLoaded: true,
        address: companyData.property_address.address
      })
    }

    return (
      <Layout secure companyID>
        { hasLoaded &&
          <div className="company-overview has-hero-button" data-test="component-manage-company">
            <div className="company-header link" onClick={() => navigate('/dashboard/company')}>
              { address.premise }, { address.postcode }
            </div>

            <h1>{ t('dashboard.company.manage.title') }</h1>
            <p>{ t('dashboard.company.manage.text') }</p>

            <br />

            <p><b>{ t('dashboard.company.manage.select') }</b></p>

            <OptionSelect
              options={[
                { id: 'withdrawMoney', title: t('dashboard.company.manage.options.withdrawMoney') },
                { id: 'sendMoney', title: t('dashboard.company.manage.options.sendMoney') },
                { id: 'manageDirector', title: t('dashboard.company.manage.options.manageDirector') },
                { id: 'manageShares', title: t('dashboard.company.manage.options.manageShares') },
                { id: 'delist', title: t('dashboard.company.manage.options.delist') },
                { id: 'reportIssue', title: t('dashboard.company.manage.options.reportIssue') },
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
                onClick={() => this.handleLiveChat(liveChatTopic)}
                disabled={!liveChatTopic}
              />
            </div>
          </div>
        }
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
