import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import estoqueReducer from './estoque/estoqueReducer';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import promise from 'redux-promise-middleware';

import { reducer as forms } from 'redux-form';
 
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(multi, thunk, promise)
);

const store = createStore(combineReducers({ estoque: estoqueReducer, form:forms }), enhancer);

export default store;