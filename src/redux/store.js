import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const composedEnhancer = composeWithDevTools();
const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;