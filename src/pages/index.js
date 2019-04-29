import React from 'react'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

const IndexPage = () => (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Home</h1>
    </Layout>
)

export default IndexPage
