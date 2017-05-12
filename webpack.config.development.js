const configMerge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const developmentConfig = {
  devServer: {
    hot: true,
    port: 9001,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api': 'http://127.0.0.1:9000'
    }
  },
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9001',
      'webpack/hot/only-dev-server',
      // 'webpack-hot-middleware/client',
      './client/app/'
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = configMerge(baseConfig, developmentConfig);
