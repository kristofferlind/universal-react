import React from 'react';
import passport from 'passport';
import express from 'express';
import { renderToString } from 'react-dom/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';
import { StaticRouter } from 'react-router';
import path from 'path';
import compression from 'compression';
import inlineCSS from './critical-css.middleware';

import './polyfills';
import api from './api';
import auth from './auth';
import cookieService from '../client/components/cookie.service';
import environment from './config/environment';
import Root from '../client/app/root';
import rootReducer from '../client/app/root.reducer';
import configureStore from '../client/app/store';
import errorHandler from './error';

process.on('unhandledRejection', (reason) => {
  console.error(reason); // eslint-disable-line
});

const app = express();

app.use(compression());
app.use(bodyParser.json());
mongoose.connect(environment.mongo.uri, environment.mongo.options);

app.use(passport.initialize());

// set up Jade
app.set('view engine', 'ejs');
app.set('views', `${process.cwd()}/server/views`);

const server = http.Server(app);
export const io = require('socket.io')(server); // eslint-disable-line

app.use('/api', api(io));
app.use('/auth', auth);
app.use('/static', express.static(path.join(__dirname, '../', 'dist')));

app.use(inlineCSS({
  override: true,
  cssFilePath: 'dist/main.css'
}));

app.get('/*', (req, res) => {
  cookieService.init(req.headers.cookie);
  const staticRouter = new StaticRouter();
  staticRouter.props = { location: req.url, context: {}, basename: '' };
  const { props: { history } } = staticRouter.render();
  const store = configureStore({}, history, rootReducer);
  const context = {};
  const html = (
    <StaticRouter location={req.url} context={context}>
      <Root history={history} store={store} />
    </StaticRouter>
  );
  store.renderUniversal(renderToString, html)
    .then(({ output }) => {
      res.render('index', {
        initialState: store.getState(),
        content: output
      });
    })
    .catch((error) => {
      console.error(error) // eslint-disable-line
    });
});

app.use(errorHandler);
server.listen(9000);
