const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const config = require('./webpack.base.config.js');

config.output.path = require('path').resolve('./assets/dist');
config.output.publicPath = '/static/dist/';

config.plugins = config.plugins.concat([
  new webpack.NormalModuleReplacementPlugin(/\.\/environment\.dev/,
    './environment.production'),
  new BundleTracker({filename: './config/webpack-stats-prod.json'}),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]);

module.exports = config;
