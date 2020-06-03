import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducers from './rootReducer';
const middleware = [thunk, logger];

export default createStore(rootReducers, applyMiddleware(...middleware));
