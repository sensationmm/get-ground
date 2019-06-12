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

import AddIcon from 'src/assets/images/add-icon.svg';

import functions from 'src/utils/functions';

// import './company-overview.scss';

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
                  company={(({ id, address }) => ({ id, address }))(company)}
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
                  company={(({ id, address }) => ({ id, address }))(company)}
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
              onClick={() => navigate('/company-design')}
            />
          </center>
        </List>
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
