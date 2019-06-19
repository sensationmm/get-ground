import React from 'react';
import { useTranslation } from 'react-i18next';
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

import functions from 'src/utils/functions';

import './dashboard.scss';

/**
 * Dashboard
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Dashboard
 */
const Dashboard = (props) => {
  const [ t ] = useTranslation();
  const { actions, companies, setActiveCompany } = props;

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
      <div data-test="component-dashboard" className="dashboard company-overview">
        <h1>Dashboard</h1>
        <div className="company-header link profile" data-test="profile-button" onClick={() => navigate('/account')}>
          { t('dashboard.main.profileLink') }
        </div>

        <ActionBox actions={addCompany ? [addCompany] : actions} />

        <div className="dashboard-columns">
          <div>
            <h3>{ t('dashboard.main.portfolioHeader') }</h3>
            <Button
              classes="primary small add-company"
              data-test="add-company-button"
              label={ t('dashboard.main.addCompanyButton') }
              onClick={() => navigate('/company-design/intro')}
            />

            { hasCompanies && companies.map((company, count) => (
              <CompanyLink
                key={`company-${count}`}
                company={(({ id, address }) => ({ id, address }))(company)}
                setActiveCompany={setActiveCompany}
              />
            ))}

            {!hasCompanies && <div className="no-properties">{ t('dashboard.main.noProperties') }</div>}
          </div>
          
          <div>
            <List numToShow={4}>
            <h3>{ t('dashboard.main.todoHeader') }</h3>
            { hasCompanies && hasActions && actions.map((action, count) => {
              const company = functions.getByValue(companies, 'id', action.companyID);
              return (
                <ToDo
                  key={`todo-${count}`}
                  action={action}
                  company={(({ id, address }) => ({ id, address }))(company)}
                  setActiveCompany={setActiveCompany}
                />
              )
            })}
            {(!hasCompanies || !hasActions) && <p>{ t('dashboard.main.noActions') }</p>}
            </List>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies,
  actions: state.actions
});

const actions = { setActiveCompany };

Dashboard.propTypes = {
  companies: PropTypes.array,
  setActiveCompany: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      companyID: PropTypes.string,
      dismissable: PropTypes.bool
    })
  )
};

export const RawComponent = Dashboard;

export default connect(mapStateToProps, actions)(Dashboard);
