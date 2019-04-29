import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from './reducers';

const createStore = () => reduxCreateStore(rootReducer);

export const ReduxWrapper = ({ children }) => (
  <Provider store={createStore()}>{children}</Provider>
)

ReduxWrapper.propTypes = {
  children: PropTypes.object
}
