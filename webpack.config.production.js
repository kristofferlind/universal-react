const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const configMerge = require('webpack-merge');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');

const productionConfig = {
  entry: {
    main: ['./client/app/']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'sourcemap',
  bail: true,
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   redux: 'Redux',
  //   'react-router': 'ReactRouter'
  // },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    // new webpack.NormalModuleReplacementPlugin(/app\.routes/, './app.routes.async.jsx'),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new OfflinePlugin({
      publicPath: './',
      caches: 'all',
      responseStrategy: 'cache-first',
      updateStrategy: 'changed',
      externals: [
        '/',
        '/main.css'
        // 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/react-router/4.1.1/react-router.min.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js'
      ],
      autoUpdate: 15 * 60 * 10000,  // check for updates every 15minutes
      ServiceWorker: {
        events: true,
        minify: true,
        navigateFallbackURL: '/'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  }
};

module.exports = configMerge(baseConfig, productionConfig);
