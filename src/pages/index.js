import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import Layout from 'src/components/Layout/Layout'

const IndexPage = () => {

  return (
    <Fragment>
      <Layout>
        <div data-test="container-home" className="home" role="homepage">
          <Link to="/onboarding">Onboarding</Link>
          <Link to="/company-design">Company Design</Link>
        </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage;
