const path = require('path');
// webpack plugins
const webpackConfig = require('./webpack.config');
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(webpackConfig,{

  output: {

    path: path.resolve(__dirname, '../dist/'),

    filename: '[name].min.js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-[chunkhash].js'

  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
  ]
});
