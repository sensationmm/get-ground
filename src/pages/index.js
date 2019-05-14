import React, { Fragment } from 'react'

import Layout from 'src/components/Layout/Layout'

const IndexPage = () => {

  return (
    <Fragment>
      <Layout>
        <div data-test="container-home" className="home" role="homepage">
      </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage;
