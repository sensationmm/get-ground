import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { getByValue } from 'src/utils/functions';
import formUtils from 'src/utils/form';
import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import Button from 'src/components/_buttons/Button/Button';
import ButtonIcon from 'src/components/_buttons/ButtonIcon/ButtonIcon';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { userUpdate } from 'src/state/actions/user';

import IconChat from 'src/assets/images/chat.svg';
import { filePath } from 'src/config/endpoints';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import './account.scss';

const defaultState = {
  edit_occupation: false,
  edit_phone_number: false,
  edit_email: false
};

/**
 * Account
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Company
 */
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.config = null;
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  /**
   * toggleEdit
   * @param {string} field - field to toggle
   * @return {void}
   */
  toggleEdit = (field) => {
    this.setState({
      ...defaultState,
      [`edit_${field}`]: !this.state[`edit_${field}`]
    }, () => {
      if(this.state[`edit_${field}`]) {
        formUtils.initFormState({ [field]: this.props.user[field] });
      } else {
        formUtils.clearFormState();
      }
    });
  }

  /**
   * updateProfile
   * @param {string} field - field to update
   * @return {void}
   */
  updateProfile = (field) => {
    const { user, form, showLoader, hideLoader, userUpdate, t } = this.props;

    if(formUtils.validateForm(this.config[field])) {
      showLoader();

      const payload = { userID: user.id, [field]: form.values[field] };

      AccountService.updatePersonalDetails(payload)
      .then((response) => {
        hideLoader();
        if (response.status === 200) {
          this.toggleEdit(field);
          userUpdate(field, form.values[field]);
        } else {
          formUtils.setFormError(t('form.correctErrors'));
        }
      });
    } else {
      formUtils.setFormError(t('form.correctErrors'));
    }
  }

  /**
   * enterSubmit
   * @param {event} e - event object
   * @return {void}
   */
  enterSubmit = (e) => {
    if(e.key === 'Enter') {
      this.updateProfile(e.target.id);
    }
  }

  render() {
    const { user, t, form, documents } = this.props;
    const { values } = form;
    const { edit_occupation, edit_email, edit_phone_number } = this.state;

    /* istanbul ignore next */
    const address = user.address && [
      user.address.premise,
      user.address.street,
      user.address.thoroughfare,
      user.address.posttown,
      user.address.postcode
    ].filter(content => !!content);

    this.config = {
      occupation: [{
        stateKey: 'occupation',
        component: InputText,
        value: values.occupation,
        validationFunction: ['validateRequired','validateLettersOnly'],
        onKeyPress: this.enterSubmit
      }],
      phone_number: [{
        stateKey: 'phone_number',
        component: InputPhone,
        value: values.phone_number,
        validationFunction: ['validateRequired','validatePhone'],
        onKeyPress: this.enterSubmit
      }],
      email: [{
        stateKey: 'email',
        component: InputText,
        value: values.email,
        validationFunction: ['validateRequired','validateEmail'],
        onKeyPress: this.enterSubmit
      }]
    }

    const passport = getByValue(documents, 'description', 'passport');
    const addressProof = getByValue(documents, 'description', 'address');
    const signature = getByValue(documents, 'description', 'signature');

    return (
      <Layout secure>
        <div className="company-overview account profile" data-test="container-profile">
          <div className="company-header">{ `${user.first_name} ${user.last_name}` }</div>

          <div className="company-overview-section">
            <Form spacing="30px">
              <div>
                <h2>{ t('profile.sections.name') }</h2>
                <p>{ `${user.first_name} ${user.middle_name} ${user.last_name}`}</p>
              </div>

              <div>
                <h2>{ t('profile.sections.previousNames') }</h2>
                <p>{user.previous_names ? user.previous_names : '-'}</p>
              </div>

              <div>
                <h2>{ t('profile.sections.dob') }</h2>
                <p>{moment(user.date_of_birth).format('DD/MM/YYYY')}</p>
              </div>

              <div>
                <h2>{ t('profile.sections.birthCity') }</h2>
                <p>{user.birth_town}</p>
              </div>
            </Form>
          </div>

          <div className="company-overview-section" data-test="section-occupation">
            <h2>{ t('profile.sections.occupation') }</h2>
            {!edit_occupation
              ? <p>{user.occupation}</p>
              : formUtils.renderForm(this.config.occupation)
            }
            <div className="account-edit">
            {!edit_occupation
              ? <Button classes="inline" label={ t('profile.edit') } onClick={() => this.toggleEdit('occupation')} />
              : <Button classes="inline primary" label={ t('profile.save') } onClick={() => this.updateProfile('occupation')} />
            }
            </div>
          </div>

          <div className="company-overview-section" data-test="section-phone">
            <h2>{ t('profile.sections.phone') }</h2>
            {!edit_phone_number
              ? <p>{user.phone_number}</p>
              : formUtils.renderForm(this.config.phone_number)
            }
            <div className="account-edit">
            {!edit_phone_number
              ? <Button classes="inline" label={ t('profile.edit') } onClick={() => this.toggleEdit('phone_number')} />
              : <Button classes="inline primary" label={ t('profile.save') } onClick={() => this.updateProfile('phone_number')} />
            }
            </div>
          </div>

          <div className="company-overview-section" data-test="section-email">
            <h2>{ t('profile.sections.email') }</h2>
            {!edit_email
              ? <p>{user.email}</p>
              : formUtils.renderForm(this.config.email)
            }
            <div className="account-edit">
            {!edit_email
              ? <Button classes="inline" label={ t('profile.edit') } onClick={() => this.toggleEdit('email')} />
              : <Button classes="inline primary" label={ t('profile.save') } onClick={() => this.updateProfile('email')} />
            }
            </div>
          </div>

          <div className="company-overview-section">
            <h2>{ t('profile.sections.homeAddress') }</h2>
            <p>{address && address.join(', ')}</p>
          </div>

          <div className="company-overview-section">
            <h2>{ t('profile.sections.passport') }</h2>
            <div className="account-proof-edit">
              {passport && <img src={`${filePath}${passport.filename}`} /> }
              <ButtonIcon liveChat icon={IconChat} />
            </div>
          </div>

          <div className="company-overview-section">
            <h2>{ t('profile.sections.proofAddress') }</h2>
            <div className="account-proof-edit">
              {addressProof && <img src={`${filePath}${addressProof.filename}`} /> }
              <ButtonIcon liveChat icon={IconChat} />
            </div>
          </div>

          <div className="company-overview-section" data-test="section-signature">
            <h2>{ t('profile.sections.signature') }</h2>
            <div className="signature">
              {signature && <img src={`${filePath}${signature.filename}`} /> }
            </div>
            <div className="account-edit">
              <Button classes="inline" label={ t('profile.edit') } onClick={() => navigate('/account/signature-edit') } />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  user: state.user,
  form: state.form,
  documents: state.documents
});

const actions = { showLoader, hideLoader, userUpdate };

Account.propTypes = {
  t: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  user: PropTypes.object,
  form: PropTypes.object,
  documents: PropTypes.arrayOf(PropTypes.object),
  userUpdate: PropTypes.func
};

export const RawComponent = Account;

export default connect(mapStateToProps, actions)(withTranslation()(Account));
