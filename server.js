import koa from 'koa';
import route from 'koa-route';
import path from 'path';
import fs from 'fs';
import React,{Component} from 'react';
import ReactDOMServer from 'react/lib/ReactDOMServer';
import createBrowserHistory from 'history/lib/createBrowserHistory'
//import {ReactDOM} from 'react-dom';
import {Router, hashHistory, match, RouterContext} from 'react-router';
import webpack from 'webpack'
import config from './webpack.config.dev';
import {createLocation} from 'history';
import routes from './js/shared/routes';

import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from './js/shared/reducers';

let compiler = webpack(config);

const app = koa();

let middleware = require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
});

app.use(middleware);

app.use(require("koa-webpack-hot-middleware")(compiler));



app.use(route.get('/', main));

app.use(route.get('/home', main));

app.use(route.get('/menu', menu));

function *menu(){
    this.body = {menu: [
	{title: 'Menu1', data:'123456789'},
	{title: 'Menu2', data:'123456789'},
	{title: 'Menu3', data:'123456789'},
	{title: 'Menu4', data:'123456789'},
	{title: 'Menu5', data:'123456789'},
	{title: 'Menu6', data:'123456789'},
	{title: 'Menu7', data:'123456789'},
	{title: 'Menu8', data:'123456789'}
    ]};
}

function *main(){
	const self = this;
	//Запускаем редюсер и сторе Redux
	const reducer  = combineReducers(reducers);
	const store    = createStore(reducer);
	//console.log(store.getState());
	const location = createLocation(this.req.path, this.req.query);
	match({routes, location}, (err, redirectLocation, renderProps) => {
	    const InitialComponent = (
			<Provider store={store}>
				<RouterContext {...renderProps} />
			</Provider>
		);
	    const initialState = store.getState();
	    const componentHTML = ReactDOMServer.renderToString(InitialComponent);
	    const HTML = `
	    <DOCTYPE html>
	    <html>
	    <head>
		<meta charset="utf-8">
		<title>Fot-online</title>
		<script type="application/javascript">
		    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
		</script>
	    </head>
	    <body>
		<div id="react-view">
		    <div>${componentHTML}</div>
		</div>
		<script type="application/javascript" src="/dist/bundle.js"></script>
	    </body>
	    </html>
	    `;
	self.body = HTML;
	});
}

export default app;
