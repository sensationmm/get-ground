import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import formUtils from 'src/utils/form';
import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import Button from 'src/components/_buttons/Button/Button';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { userUpdate } from 'src/state/actions/user';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import amex from 'src/assets/images/payment/amex.png';
import diners from 'src/assets/images/payment/diners.png';
import discover from 'src/assets/images/payment/discover.png';
import jcb from 'src/assets/images/payment/jcb.png';
import mastercard from 'src/assets/images/payment/mastercard.png';
import unionpay from 'src/assets/images/payment/unionpay.png';
import visa from 'src/assets/images/payment/visa.png';
import unknown from 'src/assets/images/payment/unknown.png';

import './account.scss';

const defaultState = {
  edit_occupation: false,
  edit_phone_number: false,
  edit_email: false
};

/**
 * Account
 * @author Kevin Reynolds
 * @param {string} liveChatTopic - topic to be passed to live chat
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

  handleLiveChat = (liveChatTopic) => {
    const custom_variables = [
      { name: 'Manage my account', value: liveChatTopic },
    ];
    if (window) {
      window.LC_API.set_custom_variables(custom_variables);
      window.LC_API.open_chat_window()
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
    const address = [
      user.premise,
      user.street,
      user.thoroughfare,
      user.posttown,
      user.postcode
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

    const passportData = documents.file_passport && documents.file_passport.contents;
    const addressProof = documents.file_proof_of_address && documents.file_proof_of_address.contents;
    const signature = documents.file_signature;

    const paymentCard = user.payment_details ? user.payment_details : {};

    let cardImage = '';
    switch(paymentCard.brand) {
      case 'amex':
        cardImage = <img src={amex} />;
        break;
      case 'diners':
        cardImage = <img src={diners} />;
        break;
      case 'discover':
        cardImage = <img src={discover} />;
        break;
      case 'jcb':
        cardImage = <img src={jcb} />;
        break;
      case 'mastercard':
        cardImage = <img src={mastercard} />;
        break;
      case 'unionpay':
        cardImage = <img src={unionpay} />;
        break;
      case 'visa':
        cardImage = <img src={visa} />;
        break;
      case 'unknown':
      default:
        cardImage = <img src={unknown} />;

    }

    return (
      <Layout secure>
        <div className="company-overview account profile" data-test="container-profile">
          <h1>{ t('profile.title') }</h1>

          <div className="dashboard-columns">
            <div>
              <div className="company-overview-section">
                <Form spacing="30px">
                  <div>
                    <h2>{ t('profile.sections.name') }</h2>
                    <p>{ `${user.first_name}${user.middle_name ? ` ${user.middle_name} ` : ''} ${user.last_name}`}</p>
                  </div>

                  {user.previous_names &&
                    <div>
                      <h2>{ t('profile.sections.previousNames') }</h2>
                      <p>{user.previous_names}</p>
                    </div>
                  }

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
                  ? <Button
                    classes="inline"
                    label={ t('profile.edit') }
                    onClick={() => this.toggleEdit('occupation')}
                  />
                  : <Button
                    classes="inline save"
                    label={ t('profile.save') }
                    onClick={() => this.updateProfile('occupation')}
                  />
                }
                </div>
              </div>
            </div>

            <div>
              <div className="company-overview-section" data-test="section-phone">
                <h2>{ t('profile.sections.phone') }</h2>
                {!edit_phone_number
                  ? <p>{user.phone_number}</p>
                  : formUtils.renderForm(this.config.phone_number)
                }
                <div className="account-edit">
                {!edit_phone_number
                  ? <Button classes="inline" label={ t('profile.edit') } onClick={() => this.toggleEdit('phone_number')} />
                  : <Button classes="inline save" label={ t('profile.save') } onClick={() => this.updateProfile('phone_number')} />
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
                  : <Button classes="inline save" label={ t('profile.save') } onClick={() => this.updateProfile('email')} />
                }
                </div>
              </div>

              <div className="company-overview-section">
                <h2>{ t('profile.sections.homeAddress') }</h2>
                <p>{address && address.join(', ')}</p>
              </div>

              {paymentCard.brand &&
                <div className="company-overview-section">
                  <h2>{ t('profile.sections.payment') }</h2>
                  <div className="payment">
                    { cardImage }
                    <table><tbody>
                      <tr><th>{ t('profile.sections.paymentCard') }</th><td>{ paymentCard.last4 }</td></tr>
                      <tr><th>{ t('profile.sections.paymentExp') }</th><td>{ paymentCard.exp_month }/{ paymentCard.exp_year }</td></tr>
                      </tbody></table>
                  </div>

                  <div className="account-edit">
                    <Button
                      classes="inline chat"
                      data-test="live-chat-payment"
                      label={ t('profile.edit') }
                      onClick={() => this.handleLiveChat('Payment')}
                    />
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="dashboard-columns">
            <div className="company-overview-section">
              <h2>{ t('profile.sections.passport') }</h2>
              {passportData && <img data-test='passport-proof' src={`data:image/jpeg;base64, ${passportData}`} /> }

              <div className="account-edit">
                <Button
                  classes="inline chat"
                  data-test="live-chat-passport"
                  label={ t('profile.edit') }
                  onClick={() => this.handleLiveChat('Passport')}
                />
              </div>
            </div>

            <div className="company-overview-section">
              <h2>{ t('profile.sections.proofAddress') }</h2>
              {addressProof && <img data-test='address-proof' src={`data:image/jpeg;base64, ${addressProof}`} /> }

              <div className="account-edit">
                <Button
                  classes="inline chat"
                  data-test="live-chat-address"
                  label={ t('profile.edit') }
                  onClick={() => this.handleLiveChat('Address')}
                />
              </div>
            </div>
          </div>

          <div className="company-overview-section" data-test="section-signature">
            <h2>{ t('profile.sections.signature') }</h2>
            <div className="signature">
              {signature && <img data-test="signature" src={signature.includes('data:image') ? signature : `data:image/jpeg;base64, ${signature}`} /> }
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
  documents: PropTypes.object,
  userUpdate: PropTypes.func
};

export const RawComponent = Account;

export default connect(mapStateToProps, actions)(withTranslation()(Account));
