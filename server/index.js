require('babel-core/register')({
  presets: [
    'es2015',
    'stage-2',
    'react'
  ],
  plugins: [
    'transform-class-properties',
    'transform-runtime',
    'syntax-dynamic-import',
    'dynamic-import-node'
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types']
    }
  }
});
require('./server.jsx');
