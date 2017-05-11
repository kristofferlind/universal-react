const developmentConfig = require('./webpack.config.development');
const productionConfig = require('./webpack.config.production');

let config = developmentConfig;

if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION MODE'); // eslint-disable-line no-console
  config = productionConfig;
}

module.exports = config;
