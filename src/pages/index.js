import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import LiveChat from 'react-livechat';

import Layout from 'src/components/Layout/Layout'

const IndexPage = () => {
  const yahh = [{
    name: 'change',
    value: 'passport'
  }]

  return (
    <Fragment>
      <Layout>
        <div data-test="container-home" className="home" role="homepage">
          <Link to="/onboarding">Onboarding</Link>
          <Link to="/company-design">Company Design</Link>
          <LiveChat
            license={10911047}
           />
          <button onClick={() => window.LC_API.open_chat_window()}>PRESS NEE</button>
          <button onClick={() => window.LC_API.set_custom_variables(yahh)}>set vars</button>
        </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage;
