const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {

  entry: {
    'app': './src/index.js'
  },

  resolve: {

    extensions: ['.js', '.css','*'],
    alias: {
      '@': path.resolve(__dirname,'./src/')
    }

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },

      {
      	test: /\.css$/,
        use: ['style-loader',{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },'postcss-loader']
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
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { 
        from: path.resolve(__dirname,'./src/assets')
      }
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/favicon.ico')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './')
    }),
  ],
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    port: 9000,
    inline: true
  }

};
