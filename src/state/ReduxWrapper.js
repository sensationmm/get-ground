import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store'



export const ReduxWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

ReduxWrapper.propTypes = {
  children: PropTypes.object
}
