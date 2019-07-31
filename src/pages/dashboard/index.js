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

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/Company';
export const CompanyService = new companyService();

import functions from 'src/utils/functions';

import './dashboard.scss';

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
  
  render() {
    const { actions, companies, setActiveCompany, t } = this.props;
    const hasActions = (actions.length > 0);
    const hasCompanies = (companies.length > 0);
    let addCompany;
    
    if(!hasCompanies) {
      addCompany = {
        type: 'add_company',
        companyID: null,
        dismissable: false
      }
    }

    const completeCompanies = companies.filter(company => company.progress.overall_status !== 'INCOMPLETE');
    const hasCompleteCompanies = (completeCompanies.length > 0);

    const incompleteCompanies = companies.filter(company => company.progress.overall_status === 'INCOMPLETE');
    const hasIncompleteCompanies = (incompleteCompanies.length > 0);

    return (
      <Layout secure>
        <div data-test="component-dashboard" className="dashboard company-overview">
          <h1>Dashboard</h1>
          <div className="company-header link profile" data-test="profile-button" onClick={() => navigate('/account')}>
            { t('dashboard.main.profileLink') }
          </div>
  
          <ActionBox actions={!hasCompanies ? [addCompany] : actions} />
  
          <div className="dashboard-columns">
            <div>
              <h3>{ t('dashboard.main.portfolioHeader') }</h3>
              {hasCompanies && 
                <Button
                  classes="primary small add-company"
                  data-test="add-company-button"
                  label={ t('dashboard.main.addCompanyButton') }
                  onClick={() => navigate('/company-design/intro')}
                />
              }
  
              {hasCompleteCompanies && 
                completeCompanies.map((company, count) => (
                  <CompanyLink
                    key={`company-${count}`}
                    company={(({ id, property_address, progress }) => ({ id, property_address, progress }))(company)}
                    setActiveCompany={setActiveCompany}
                    propertyInProgressText={t('dashboard.main.propertyInProgressText')}
                  />
                ))
              }
  
              {!hasCompleteCompanies && <div className="no-properties">{ t('dashboard.main.noProperties') }</div>}
            </div>
            
            <div>
              <List>
              <h3>{ t('dashboard.main.todoHeader') }</h3>
              {incompleteCompanies.map((company, count) => {
                return (
                  <ToDo
                    key={`todo-company-${count}`}
                    action={{
                      type: 'complete_company',
                      companyID: company.id
                    }}
                    company={company}
                    setActiveCompany={setActiveCompany}
                  />
                )
              })}

              { hasCompanies && hasActions && actions.map((action, count) => {
                const company = functions.getByValue(companies, 'id', action.companyID);
                return (
                  <ToDo
                    key={`todo-${count}`}
                    action={action}
                    company={company}
                    setActiveCompany={setActiveCompany}
                  />
                )
              })}
              {(!hasIncompleteCompanies && (!hasCompanies || !hasActions)) && <p>{ t('dashboard.main.noActions') }</p>}
              </List>
            </div>
          </div>
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
  userID: PropTypes.string,
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
