import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = process.env.NODE_ENV === 'development' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunk))) : createStore(reducers, applyMiddleware(thunk));

export default store;