import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import formUtils from 'src/utils/form';
import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Button from 'src/components/_buttons/Button/Button';
import ShareholderChoice from './fragments/ShareholderChoice';
import AddShareholder from './fragments/AddShareholder';
import ShareholderShares from './fragments/ShareholderShares';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import companyService from 'src/services/Company';
export const CompanyService = new companyService();

import AddIcon from 'src/assets/images/add-icon.svg';

import './shareholder-details.scss';
import i18n from '../../../i18n';

export const shareholder = {
  first_name: '',
  last_name: '',
  email: '',
  allocated_shares: '',
  is_director: false
}

/**
 * ShareholderDetails
 * @return {JSXElement} ShareholderDetails
 */
class ShareholderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareholders: 1,
      hasShareholders: this.props.company && this.props.company.shareholder_details.collection && this.props.company.shareholder_details.collection.filter(item => item.first_name !== '').length > 0,
      stage: 'add',
      totalShares: 0
    };

    this.shareholder0 = null;
    this.shareholder1 = null;
    this.shareholder2 = null;
    this.shareholder3 = null;
    this.shareholder4 = null;
    this.shareholder5 = null;
    this.shareholder6 = null;
    this.shareholder7 = null;

    this.shareholderShares0 = null;
    this.shareholderShares1 = null;
    this.shareholderShares2 = null;
    this.shareholderShares3 = null;
    this.shareholderShares4 = null;
    this.shareholderShares5 = null;
    this.shareholderShares6 = null;
    this.shareholderShares7 = null;
  }

  componentDidMount() {
    const { company: { shareholder_details }} = this.props;
    const shareholders = shareholder_details.collection === null ? [{...shareholder}] : shareholder_details.collection;
    const populatedShareholders = shareholders.length;

    for (let i = shareholders.length; i < 8; i++) {
      shareholders.push({...shareholder})
    }

    formUtils.initFormState([
      {...shareholder},{...shareholder},{...shareholder},{...shareholder},
      {...shareholder},{...shareholder},{...shareholder},{...shareholder}
    ], shareholders);

    if (populatedShareholders > 1) {
      this.setState({ shareholders: populatedShareholders });
    }
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  /**
   * updateShareholder
   * @param {integer} id - form values ix to update
   * @param {string} key - array key to update
   * @param {string} value - value to set
   * @return {void}
   */
  updateShareholder = (id, key, value) => {
    const shareholder = this.props.form.values[id];
    shareholder[key] = value;

    let totalShares = 0;
    formUtils.updateValue(id, shareholder, () => {
        if(key === 'allocated_shares') {
        this.props.form.values.forEach(item => {
          if(item.allocated_shares) {
            totalShares = totalShares + parseInt(item.allocated_shares);
          }
        });

        this.setState({
          totalShares: totalShares
        });
      }
    }, true);

    if(key === 'allocated_shares') {
      this.validateShareholderShares();
    }
  }

  validateShareholders = /* istanbul ignore next */() => {

    const shareholder0Valid = !this.shareholder0 || (this.shareholder0 && this.shareholder0.validate());
    const shareholder1Valid = !this.shareholder1 || (this.shareholder1 && this.shareholder1.validate());
    const shareholder2Valid = !this.shareholder2 || (this.shareholder2 && this.shareholder2.validate());
    const shareholder3Valid = !this.shareholder3 || (this.shareholder3 && this.shareholder3.validate());
    const shareholder4Valid = !this.shareholder4 || (this.shareholder4 && this.shareholder4.validate());
    const shareholder5Valid = !this.shareholder5 || (this.shareholder5 && this.shareholder5.validate());
    const shareholder6Valid = !this.shareholder6 || (this.shareholder6 && this.shareholder6.validate());
    const shareholder7Valid = !this.shareholder7 || (this.shareholder7 && this.shareholder7.validate());

    const isValid = shareholder0Valid &&
      shareholder1Valid &&
      shareholder2Valid &&
      shareholder3Valid &&
      shareholder4Valid &&
      shareholder5Valid &&
      shareholder6Valid &&
      shareholder7Valid;

    return isValid;
  }

  validateShareholderShares = /* istanbul ignore next */() => {

    const shareholder0Valid = !this.shareholderShares0 || (this.shareholderShares0 && this.shareholderShares0.validate());
    const shareholder1Valid = !this.shareholderShares1 || (this.shareholderShares1 && this.shareholderShares1.validate());
    const shareholder2Valid = !this.shareholderShares2 || (this.shareholderShares2 && this.shareholderShares2.validate());
    const shareholder3Valid = !this.shareholderShares3 || (this.shareholderShares3 && this.shareholderShares3.validate());
    const shareholder4Valid = !this.shareholderShares4 || (this.shareholderShares4 && this.shareholderShares4.validate());
    const shareholder5Valid = !this.shareholderShares5 || (this.shareholderShares5 && this.shareholderShares5.validate());
    const shareholder6Valid = !this.shareholderShares6 || (this.shareholderShares6 && this.shareholderShares6.validate());
    const shareholder7Valid = !this.shareholderShares7 || (this.shareholderShares7 && this.shareholderShares7.validate());

    const isValid = shareholder0Valid &&
      shareholder1Valid &&
      shareholder2Valid &&
      shareholder3Valid &&
      shareholder4Valid &&
      shareholder5Valid &&
      shareholder6Valid &&
      shareholder7Valid;

    return isValid;
  }

  addShareholder = () => {
    const shareholders = this.state.shareholders;

    const isValid = this.validateShareholders();

    if(isValid) {
      this.setState({
        ...this.state,
        shareholders: shareholders + 1
      });
    }
  }

  toggleShareholders = () => {
    this.setState({ hasShareholders: !this.state.hasShareholders });
  }

  setNoShareholders = () => {
    navigate('/company-design/tax-questions');
  }

  addDetails = () => {
    const isValid = this.validateShareholders();

    if(isValid) {
      this.setState({
        stage: 'details'
      });
    }
  }

  confirmShares = () => {
    const isValid = this.validateShareholderShares();

    if(isValid) {
      this.setState({
        stage: 'confirm'
      });
    } else {
      formUtils.setFormError(this.props.t('companyDesign.shareholderDetails.shares.error'));
    }
  }

  addDetailsBack = () => this.setState({ stage: 'add' });

  /**
   * renderShareholders
   * @param {integer} count - number of shareholders to render
   * @return {array} array of AddShareholder
   */
  renderShareholders = (count) => {
    const render = [];
    const { form } = this.props;

    for(let i=0; i<count; i++) {
      const first_name = form.values[i] === undefined ? '' : form.values[i].first_name;
      const last_name = form.values[i] === undefined ? '' : form.values[i].last_name;
      const email = form.values[i] === undefined ? '' : form.values[i].email;

      render.push(
        <AddShareholder
          shareholderID={i}
          onRef={/* istanbul ignore next */(ref) => this[`shareholder${i}`] = ref}
          key={`shareholder${i}`}
          onChange={this.updateShareholder}
          first_name={first_name}
          last_name={last_name}
          email={email}
          totalShares={this.state.mainShares}
        />
      )
    }

    return render;
  }

  /**
   * renderShareholderShares
   * @param {integer} count - number of shareholders to render
   * @param {booelan} disabled - whether form is editable
   * @return {array} array of ShareholderShares
   */
  renderShareholderShares = (count, disabled=false) => {
    const render = [];
    const { form } = this.props;

    for(let i=0; i<count; i++) {
      render.push(
        <ShareholderShares
          shareholderID={i}
          onRef={/* istanbul ignore next */(ref) => this[`shareholderShares${i}`] = ref}
          key={`shareholderShares${i}`}
          name={`${form.values[i].first_name} ${form.values[i].last_name}`}
          email={form.values[i].email}
          shares={form.values[i].allocated_shares}
          is_director={form.values[i].is_director}
          onChange={this.updateShareholder}
          totalShares={this.state.totalShares}
          disabled={disabled}
        />
      )
    }

    return render;
  }

  /**
   * saveShareholders
   * @param {boolean} isSaveAndExit - whether the save and exit button has fired this or not
   * @return {void} saveShareholders
   */
  saveShareholders = async (isSaveAndExit) => {
    const { form, showLoader, hideLoader, company } = this.props;
    const { values, errors } = form;
    const shareholders = values;

    for (let i = shareholders.length - 1; i >= 0; i--) {
      if (shareholders[i].first_name === '' && shareholders[i].last_name === '' && shareholders[i].email === '') {
          shareholders.splice(i, 1);
      }
    }

    if (isSaveAndExit) {
      await Object.keys(errors).forEach(async (key) => {
        await formUtils.updateValue(key, '');
      });
    }

    const payload = {
      collection: shareholders
    }

    showLoader();
    CompanyService.updateCompany(payload, 'shareholder_details', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        if(isSaveAndExit) {
          navigate('/company-design');
        } else {
          navigate('/company-design/tax-questions');
        }
      }
    });
  }

  render() {
    const { t, form } = this.props;
    const { hasShareholders, shareholders, stage, totalShares } = this.state;

    const mainShareholder = (100 - totalShares >= 0) ? 100 - totalShares : NaN;
    const headerActions = <ButtonHeader onClick={() => {this.saveShareholders(true)}} label={t('header.buttons.saveAndExit')} />

    return (
      <Layout headerActions={headerActions} secure>
        <div data-test="container-shareholder-details" className="shareholder" role="company-design">
          {!hasShareholders &&
            <ShareholderChoice
              addShareholders={this.toggleShareholders}
              noShareholders={this.setNoShareholders}
            />
          }

          {hasShareholders && stage === 'add' &&
            <div>
              <h1>{t('companyDesign.shareholderDetails.add.title')}</h1>

              <IntroBox>
                <p>{t('companyDesign.shareholderDetails.add.textOne') }</p>
                <p>{t('companyDesign.shareholderDetails.add.textTwo') }</p>
              </IntroBox>

              {form.showErrorMessage &&
                <ErrorBox data-test="create-error-box">
                { form.errors.form
                  ? form.errors.form
                  : t('form.correctErrors')
                }
                </ErrorBox>
              }

              {this.renderShareholders(shareholders)}

              {shareholders < 7 &&
                <div className="shareholder-detail">
                  <Button
                    onClick={this.addShareholder}
                    label={t('companyDesign.shareholderDetails.add.new.cta')}
                    icon={AddIcon}
                    small
                  />
                </div>
              }
              
              <br /><br />

              <Form>
                <Button
                  onClick={this.addDetails}
                  label={t('form.ctaPrimary')}
                  classes="primary"
                  fullWidth
                />

                <Button
                  onClick={this.toggleShareholders}
                  label={t('form.ctaSecondary')}
                  classes="secondary"
                  fullWidth
                />
              </Form>
            </div>
          }

          {hasShareholders && stage === 'details' &&
            <div>
              <h1>{t('companyDesign.shareholderDetails.shares.title')}</h1>

              <IntroBox>{ t('companyDesign.shareholderDetails.shares.text') }</IntroBox>

              {form.showErrorMessage &&
                <ErrorBox data-test="create-error-box">
                { form.errors.form
                  ? form.errors.form
                  : t('form.correctErrors')
                }
                </ErrorBox>
              }

              <div className="table-headers">
                <div>{t('companyDesign.shareholderDetails.shares.sharesLabel')}</div>
                <div>{t('companyDesign.shareholderDetails.shares.directorLabel')}</div>
              </div>

              <ShareholderShares
                shareholderID={null}
                name={i18n.t('companyDesign.shareholderDetails.shares.you')}
                shares={mainShareholder.toString()}
                is_director={true}
                onChange={() => {}}
                mainShareholder
              />

              {this.renderShareholderShares(shareholders)}

              <br />

              <Form>
                <Button
                  onClick={this.confirmShares}
                  label={t('form.ctaPrimary')}
                  classes="primary"
                  fullWidth
                />

                <Button
                  onClick={this.addDetailsBack}
                  label={t('form.ctaSecondary')}
                  classes="secondary"
                  fullWidth
                />
              </Form>
            </div>
          }

          {hasShareholders && stage === 'confirm' &&
            <div>
            <h1>{t('companyDesign.shareholderDetails.confirm.title')}</h1>

            <IntroBox>{ t('companyDesign.shareholderDetails.confirm.text') }</IntroBox>

            <div className="table-headers">
              <div>{t('companyDesign.shareholderDetails.shares.sharesLabel')}</div>
              <div>{t('companyDesign.shareholderDetails.shares.directorLabel')}</div>
            </div>

            <ShareholderShares
              shareholderID={null}
              name={i18n.t('companyDesign.shareholderDetails.shares.you')}
              shares={mainShareholder.toString()}
              is_director={true}
              onChange={() => {}}
              mainShareholder
              disabled
            />

            {this.renderShareholderShares(shareholders, true)}

            <br />

            <Form>
              <Button
                onClick={() => {this.saveShareholders(false)}}
                label={t('companyDesign.shareholderDetails.confirm.ctaPrimary')}
                classes="primary"
                fullWidth
              />

              <Button
                onClick={this.addDetails}
                label={t('companyDesign.shareholderDetails.confirm.ctaSecondary')}
                classes="secondary"
                fullWidth
              />
            </Form>
          </div>
          }
        </div>
      </Layout>
    )
  }
}

ShareholderDetails.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  form: PropTypes.object,
  company: PropTypes.object
};

const mapStateToProps = (state) => ({
  form: state.form,
  user: state.user,
  company: state.companies.find(company => company.id === state.activeCompany),
});

const actions = {
  showLoader,
  hideLoader
};

export const RawComponent = ShareholderDetails;

export default connect(mapStateToProps, actions)(withTranslation()(ShareholderDetails));
