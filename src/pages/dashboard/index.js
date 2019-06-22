import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import ActionBox from 'src/components/ActionBox/ActionBox';
import CompanyLink from 'src/components/CompanyLink/CompanyLink';
import ToDo from 'src/components/ToDo/ToDo';
import List from 'src/components/_layout/List/List';
import Button from 'src/components/_buttons/Button/Button';
import { setActiveCompany } from 'src/state/actions/activeCompany';

import AddIcon from 'src/assets/images/add-icon.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/company';
export const CompanyService = new companyService();

import functions from 'src/utils/functions';

// import './company-overview.scss';

/**
 * Dashboard
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Dashboard
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveChatTopic: null
    };
  }

  componentDidUpdate(prevProps) {
    const { userID, showLoader } = this.props;
    if (prevProps.userID !== userID) {
      showLoader();
      setTimeout(() => {
        this.handleGetCompanies();
      }, 750);
    } 
  }

  handleGetCompanies = () => {
    const { hideLoader } = this.props;
    CompanyService.getCompanies()
    .then((response) => {
      hideLoader();
      // if (response.status === 200) {

      // } else {
      //  // Do nothing
      // }
    });
  }
  
  render() {
    const { actions, companies, setActiveCompany, t } = this.props;
    const hasCompanies = (companies.length > 0);
    const hasActions = (actions.length > 0);
    let addCompany;
    if(!hasCompanies) {
      addCompany = {
        type: 'add_company',
        companyID: null,
        dismissable: false
      }
    }

    return (
      <Layout secure>
        <div data-test="component-dashboard" className="company-overview">
          <div className="company-header link profile" data-test="profile-button" onClick={() => navigate('/account')}>
            { t('dashboard.main.profileLink') }
          </div>

          <ActionBox actions={addCompany ? [addCompany] : actions} />

          {hasCompanies &&
            <div>
              <h3>{ t('dashboard.main.portfolioHeader') }</h3>
              <List>
                { companies.map((company, count) => (
                  <CompanyLink
                    key={`company-${count}`}
                    company={(({ id, property_address }) => ({ id, property_address }))(company)}
                    setActiveCompany={setActiveCompany}
                  />
                ))}
              </List>
            </div>
          }

          {hasCompanies && hasActions &&
            <div>
              <h3>{ t('dashboard.main.todoHeader') }</h3>
              <List>
                { actions.map((action, count) => {
                  const company = functions.getByValue(companies, 'id', action.companyID);
                  return (
                    <ToDo
                      key={`todo-${count}`}
                      action={action}
                      company={(({ id, property_address }) => ({ id, property_address }))(company)}
                      setActiveCompany={setActiveCompany}
                    />
                  )
                })}
              </List>
            </div>
          }

          <List>
            <center>
              <Button
                data-test="add-company-button"
                icon={AddIcon}
                label={ t('dashboard.main.addCompanyButton') }
                onClick={() => navigate('/company-design/intro')}
              />
            </center>
          </List>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies,
  actions: state.actions,
  userID: state.user.id
});

const actions = { 
  setActiveCompany,
  showLoader,
  hideLoader
};

Dashboard.propTypes = {
  t: PropTypes.func.isRequired,
  companies: PropTypes.array,
  setActiveCompany: PropTypes.func,
  userID: PropTypes.number,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      companyID: PropTypes.number,
      dismissable: PropTypes.bool
    })
  )
};

export const RawComponent = Dashboard;

export default connect(mapStateToProps, actions)(withTranslation()(Dashboard));
