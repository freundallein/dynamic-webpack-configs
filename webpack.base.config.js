const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const fs = require('fs');


const entryCollector = () => {
  const searchFolder = './src/',
        regex = /.+\.ts/;  // or .js
  return fs.readdirSync(searchFolder).reduce((entry, file) => {
    if (file.match(regex)) {
      entry[file.split('.')[0]] = `./src/${file}`
    }
    return entry
  }, {})
};

config = {
  context: __dirname,
  entry: entryCollector(),

  output: {
    path: path.resolve("./assets/bundles/"),
    filename: "[name]-[hash].js",
    publicPath: "/static/bundles/"
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve("./src/"),
      {}
    ),
    new BundleTracker({filename: "./config/webpack-stats.json"})
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "awesome-typescript-loader",
            options: {configFileName: "./config/tsconfig.json"}
          }, "angular2-template-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        use: [
          "to-string-loader",
          "css-loader"
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js", ".json", ".css", "html"]
  }
};

module.exports = config;
