import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Layout from 'src/components/Layout/Layout'

import house from 'src/assets/images/fullhousepure.svg';

import './acceptance-of-role-decline.scss'

const Decline = ({ location }) => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-acceptance-of-role" className="acceptance-of-role-decline" role="account fullscreen no-background-image form-page">
      <img className="acceptance-of-role--img" src={house} />
        <h1 className="acceptance-of-role--title">{t('acceptanceOfRole.decline.title')}</h1>
        <p className="acceptance-of-role--copy-intro">{`${t('acceptanceOfRole.decline.content.firstIntro')} ${location.state && location.state.inviteeName} ${t('acceptanceOfRole.decline.content.firstContinue')}`}</p>
        <p className="acceptance-of-role--copy">{t('acceptanceOfRole.decline.content.second')}</p>
      </div>
    </Layout>
  );
}

Decline.propTypes = {
  location: PropTypes.object
}

export default Decline
