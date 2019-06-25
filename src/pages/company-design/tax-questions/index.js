import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/Company';
export const CompanyService = new companyService();

/**
 * TaxQuestions
 * @return {ReactComponent} TaxQuestions
 */
export class TaxQuestions extends Component {
  constructor(props) {
    super(props);

    this.config = []
  }

  componentDidMount() {
    formUtils.initFormState({
      is_owner_of_other_companies: null,
      more_than_50_employees: null,
      assets: null,
      turnover: null
    }, this.props.company.tax_questions);
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  submitTaxAnswers = () => {
    const { showLoader, hideLoader, t, form: { values }, company } = this.props;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config)) {
      showLoader();

      CompanyService.updateCompany(values, 'tax_questions', company.id).then((response) => {
        hideLoader();
        /* istanbul ignore else */
        if (response.status === 200) {
          navigate('/company-design/payment');

        } else if (response.status === 400) {
          formUtils.setFormError(t('form.correctErrors'));
        }
      });
    }
  }

  saveAndExit = async () => {
    const { showLoader, hideLoader, form: { errors, values }, company } = this.props;

    await Object.keys(errors).forEach(async (key) => {
      await formUtils.updateValue(key, '');
    });

    showLoader();
    CompanyService.updateCompany(values, 'tax_questions', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/company-design');
      }
    });

  }

  render() {
    const { t, form } = this.props
    const { values } = form;

    const config = [
      {
        stateKey: 'is_owner_of_other_companies',
        component: RadioGroup,
        groupLabel: t('taxQuestions.ownership'),
        name: 'is_owner_of_other_companies',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.is_owner_of_other_companies,
        validationFunction: 'validateRequired',
        istaxQuestions: true
      },
      {
        stateKey: 'more_than_50_employees',
        component: RadioGroup,
        groupLabel: t('taxQuestions.employ'),
        name: 'more_than_50_employees',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.more_than_50_employees,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.is_owner_of_other_companies || values.is_owner_of_other_companies === false
      },
      {
        stateKey: 'assets',
        component: RadioGroup,
        groupLabel: t('taxQuestions.assets'),
        name: 'assets',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.assets,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.is_owner_of_other_companies || values.is_owner_of_other_companies === false
      },
      {
        stateKey: 'turnover',
        component: RadioGroup,
        groupLabel: t('taxQuestions.turnover'),
        name: 'turnover',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.turnover,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.is_owner_of_other_companies || values.is_owner_of_other_companies === false
      },
      {
        component: 'br'
      },
      {
        component: Button,
        onClick: () => this.submitTaxAnswers(),
        label: t('taxQuestions.nextBtn'),
        classes: 'primary full',
      },
      {
        component: Button,
        onClick: () => navigate('/company-design/shareholder-details'),
        label: t('taxQuestions.backBtn'),
        classes: 'secondary full',
      },
    ];

    const { showErrorMessage, errors } = form;
    const headerActions = <ButtonHeader onClick={this.saveAndExit} label={t('header.buttons.saveAndExit')} />

    return (
      <Layout headerActions={headerActions} secure>
        <div className="tax-questions" role="company-design">
        <h1 className="tax-questions-title">{t('taxQuestions.title')}</h1>
        <IntroBox>{t('taxQuestions.introBox')}</IntroBox>
        {showErrorMessage &&
              <ErrorBox data-test="error-box">
              { errors.form
                ? errors.form
                : t('form.correctErrors')
              }
              </ErrorBox>
            }
          <Form className="tax-questions-form">
            {formUtils.renderForm(config)}
          </Form>
        </div>
      </Layout>
    )
  }
}

TaxQuestions.propTypes = {
  company: PropTypes.object,
  t: PropTypes.func.isRequired,
  form: PropTypes.object,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func
};

const mapStateToProps = state => ({
  form: state.form,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = {
  showLoader,
  hideLoader
}

export default connect(mapStateToProps, actions)(withTranslation()(TaxQuestions))
