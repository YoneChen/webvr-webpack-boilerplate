const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {

  entry: {
    'vendor': './src/common/js/vendor.js',
    'app': './src/index.js'
  },

  resolve: {

    extensions: ['.js', '.css','*'],
    alias: {
    	common: path.resolve(__dirname,'../src/common/'),
    	page: path.resolve(__dirname,'../src/page/'),
    	assets: path.resolve(__dirname,'../src/assets/'),
    	lib: path.resolve(__dirname,'../src/lib/')
    }

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },

      {
      	test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
        })
      },

      {
        test: /\.(jpg|png|gif|obj|mtl|dae|wav|ogg|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }

    ]

  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new ProvidePlugin({
      'THREE': 'three',
      'WebVR':path.resolve(__dirname,'../src/common/js/VRCore.js')
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      // favicon: path.resolve(__dirname, '../src/assets/favicon.ico')
    })
  ]

};
