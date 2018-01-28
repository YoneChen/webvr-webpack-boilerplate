const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {

  entry: {
    'vendor': './src/core/js/vendor.js',
    'app': './src/index.js'
  },

  resolve: {

    extensions: ['.js', '.css','*'],
    alias: {
      '@': path.resolve(__dirname,'../src/')
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
      	test: /\.css$/,
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
        // options: {
        //   name: '[name].[ext]'
        // }
      },

      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }

    ]

  },

  plugins: [
    new ProvidePlugin({
      'THREE': 'three',
      'TWEEN': '@tweenjs/tween.js',
      'WebVR':path.resolve(__dirname,'../src/core/js/VRCore.js')
    }),
    new ModuleConcatenationPlugin(),
    new ExtractTextPlugin('[name].css'),
    new CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { 
        from: path.resolve(__dirname,'../src/assets')
      }
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      favicon: path.resolve(__dirname, '../src/favicon.ico')
    })
  ]

};
