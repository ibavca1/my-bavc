import React       from 'react';
import { render }  from 'react-dom';
import { Router, browserHistory }  from 'react-router';
import { createBrowserHistory } from 'history/lib/createBrowserHistory';
import routes      from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from '../shared/reducers';
import { fromJS }                       from 'immutable';

import { applyMiddleware } from 'redux';
import promiseMiddleware   from '../shared/lib/promiseMiddleware';
import 'bootstrap/dist/css/bootstrap.css';


let initialState = window.__INITIAL_STATE__;

Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
   });

const reducer = combineReducers(reducers);
//const store   = createStore(reducer, initialState);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

render(
    <Provider store={store}>
	<Router children={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('react-view')
);