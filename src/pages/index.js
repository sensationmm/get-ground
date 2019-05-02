import React, { Fragment } from 'react'

import Layout from '../components/Layout/Layout'
import Select from '../components/_form/Select/Select';

const IndexPage = () => {

  const testOptions = [
    {
      name: 'test1',
      value: 'test1'
    },
    {
      name: 'test2',
      value: 'test2'
    }
  ];

  const buildTest = testOptions.map((test, index) => {
    return (
      <option key={`country-${index}`} value={test.value}>{test.name}</option>
    );
  });

  return (
    <Fragment>
      <Layout>
        <div data-test="container-home" className="home" role="homepage">
        Home
        <Select
          classes="country-select"
          defaultOptionText="Select Country"
          options={buildTest}
          label="Country"
          onChange={/* istanbul ignore next */ (e) => {}}
        />
      </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage
