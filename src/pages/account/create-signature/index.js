import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import signatureUtils from 'src/utils/signature';

import Layout from 'src/components/Layout/Layout';
import formUtils from 'src/utils/form';
import Button from 'src/components/_buttons/Button/Button';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import TextToImage from 'src/components/TextToImage/TextToImage';
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import { showLoader, hideLoader } from 'src/state/actions/loader';

import 'src/styles/pages/create-signature.scss';

/**
 * CreateSignature
 * @return {JSXElement} CreateSignature
 */
class CreateSignature extends Component {
  constructor(props){
    super(props);

    this.state = {
      signatureOneImg: '',
      signatureTwoImg: '',
      signatureThreeImg: '',
      selectedSignature: '',
      savedSignature: ''
    };

    this.config = null;
  }

  componentDidMount() {
    formUtils.initFormState({
      firstname: this.props.user.first_name,
      lastname: this.props.user.last_name
    });
  }

  splitSignature = () => {
    const { selectedSignature, signatureOneImg, signatureTwoImg, signatureThreeImg } = this.state;
    let signatureImgPath;

    if (selectedSignature === 'signature1') {
      signatureImgPath = signatureOneImg;
    } else if (selectedSignature === 'signature2') {
      signatureImgPath = signatureTwoImg;
    } else {
      signatureImgPath = signatureThreeImg;
    }
  
    const signatureBlob = signatureUtils.splitSignatureData(signatureImgPath);
    this.saveSignature(signatureBlob, signatureImgPath);
  }

  /**
  * @param {Blob} signatureBlob - signature blob
  * @param {string} signatureImgPath - img path of selected signature
  * @return {void}
  */
  saveSignature = (signatureBlob, signatureImgPath) => {
    const { showLoader, hideLoader } = this.props;

    showLoader();
    AccountService.saveSignature(signatureBlob).then(response => {
      hideLoader();
      if (response.status === 201) {
        this.setState({ savedSignature: signatureImgPath });
      } else if (response.status === 400) {
        /** NEED AC added for the error state of this page... */
      }
    });
  }

  render() {
    const { t, form: { values } } = this.props;
    const { selectedSignature, savedSignature } = this.state;

    /* istanbul ignore next */
    this.config = [
      {
        stateKey: 'firstname',
        component: InputText,
        label: t('account.createSignature.form.firstname'),
        value: values.firstname,
      },
      {
        stateKey: 'lastname',
        component: InputText,
        label: t('account.createSignature.form.lastname'),
        value: values.lastname
      }
    ];

    this.radioConfig = [
      {
        label: '',
        value: 'signature1',
        children: <TextToImage 
          canvasWrapperId="canvas-wrapper-1"
          canvasId="canvas-component-1"
          imageId="image-component-1"
          firstname={values.firstname}
          lastname={values.lastname}
          font="Caveat"
          fontSize={35}
          setSignatureImg={imgPath => this.setState({signatureOneImg: imgPath })}
        />
      },
      {
        label: '',
        value: `signature2`,
        children: <TextToImage 
          canvasWrapperId="canvas-wrapper-2"
          canvasId="canvas-component-2"
          imageId="image-component-2"
          firstname={values.firstname}
          lastname={values.lastname}
          font="Homemade Apple"
          fontSize={25}
          setSignatureImg={imgPath => this.setState({signatureTwoImg: imgPath })}
        />
      },
      {
        label: '',
        value: 'signature3',
        children: <TextToImage 
          canvasWrapperId="canvas-wrapper-3"
          canvasId="canvas-component-3"
          imageId="image-component-3"
          firstname={values.firstname}
          lastname={values.lastname}
          font="Pinyon Script"
          fontSize={35}
          setSignatureImg={imgPath => this.setState({signatureThreeImg: imgPath })}
        />
      }
    ];

    return (
      <Layout secure>
        <div className="create-signature" data-test="container-create-signature">

          <div style={{
            display: savedSignature !== '' ? 'none' : 'block'
          }}>
            <h1>{t('account.createSignature.title')}</h1>
            <IntroBox data-test="intro-box">{t('account.createSignature.intro')}</IntroBox>

            <Form className="create-signature-form">
              {formUtils.renderForm(this.config)}
            </Form>

            <div style={{
              display: values.firstname === '' ? 'none' : 'block'
            }}>

              <RadioGroup 
                groupLabel={t('account.createSignature.selectLabel')}
                classes="signatures"
                items={this.radioConfig}
                name="something"
                onChange={selectedValue => this.setState({selectedSignature: selectedValue })}
                value={selectedSignature}
              />

              { selectedSignature !== '' &&
                <Button 
                  classes="primary" 
                  label={t('account.createSignature.selectLabel')} 
                  fullWidth 
                  onClick={this.splitSignature}
                />
              }
              
            </div>

          </div>

          <div style={{
            display: savedSignature === '' ? 'none' : 'block'
          }}>
            <h1>{t('account.yourSignature.title')}</h1>
            <IntroBox data-test="intro-box">{t('account.yourSignature.intro')}</IntroBox>
            <img className="your-signature--saved-image" src={savedSignature} />
            <Button 
              data-test="button-edit"
              classes="secondary full edit"
              label={t('account.yourSignature.buttons.edit')}
              onClick={() => this.setState({ savedSignature: '' })}
            />
            <Link to="/documents">
              <Button 
                classes="primary full"
                label={t('account.yourSignature.buttons.continue')} 
              />
            </Link>
          </div>

        </div>
      </Layout>
    )
  }
}

CreateSignature.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  form: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  user: state.user
});

const actions = { showLoader, hideLoader };

export const RawComponent = CreateSignature;

export default connect(mapStateToProps, actions)(withTranslation()(CreateSignature));
