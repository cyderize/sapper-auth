import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import basicAuth from 'express-basic-auth';

import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const staticUserAuth = basicAuth({
  users: {
    'username': 'password'
  },
  challenge: true
})

express() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    staticUserAuth,
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
