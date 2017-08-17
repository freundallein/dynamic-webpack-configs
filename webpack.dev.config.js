const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const config = require('./webpack.base.config.js');

// upgrade base config entry for HMR
config.entry = Object.keys(config.entry).reduce((dev_entry, app) => {
  dev_entry[app] = [
    config.entry[app],
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3000'
  ];
  return dev_entry;
}, {});

config.output.publicPath = 'http://localhost:3000/assets/bundles/';

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './config/webpack-stats.json'}),
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
