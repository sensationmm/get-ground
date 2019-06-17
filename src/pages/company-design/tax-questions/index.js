import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { navigate, Link } from 'gatsby';
import PropTypes from 'prop-types'

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
      ownership: null,
      employ: null,
      assets: null,
      turnover: null
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  submitTaxAnswers = () => {
    const { showLoader, hideLoader, t, form } = this.props;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config)) {
      showLoader();

      CompanyService.saveTaxAnswers(form.values).then((response) => {
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

  render() {
    const { t, form } = this.props
    const { values } = form;

    const config = [
      {
        stateKey: 'ownership',
        component: RadioGroup,
        groupLabel: t('taxQuestions.ownership'),
        name: 'ownership',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.ownership,
        validationFunction: 'validateRequired',
        istaxQuestions: true
      },
      {
        stateKey: 'employ',
        component: RadioGroup,
        groupLabel: t('taxQuestions.employ'),
        name: 'employ',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.employ,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.ownership || values.ownership === 'no'
      },
      {
        stateKey: 'assets',
        component: RadioGroup,
        groupLabel: t('taxQuestions.assets'),
        name: 'assets',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.assets,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.ownership || values.ownership === 'no'
      },
      {
        stateKey: 'turnover',
        component: RadioGroup,
        groupLabel: t('taxQuestions.turnover'),
        name: 'turnover',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.turnover,
        validationFunction: 'validateRequired',
        istaxQuestions: true,
        hidden: !values.ownership || values.ownership === 'no'
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
    const headerActions = <Link to="/company-design"><ButtonHeader label={t('header.buttons.saveAndExit')} /></Link>;

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
  t: PropTypes.func.isRequired,
  form: PropTypes.object,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func
};

const mapStateToProps = state => ({
  form: state.form
});

const actions = {
  showLoader,
  hideLoader
}

export default connect(mapStateToProps, actions)(withTranslation()(TaxQuestions))
