import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import rootReducer from '../src/state/reducers';

export const history = createBrowserHistory();

const connectedRouterReducer = connectRouter(history)(rootReducer)

const initialState = {};
const enhancers = [];
export const middleware = [thunk, routerMiddleware(history)];

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(connectedRouterReducer, initialState, composedEnhancers);
