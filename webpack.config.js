var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: "./js/index.js",
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['react-html-attrs']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {　　　　　　
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'　　　　
    }]
  },
  output: {
    path: path.resolve(__dirname, '../dist'), //"E:\\prac\\sublime_text\\reactDemo\\src\\"
    filename: "bundle.js",
    publicPath: '/' //对于图片路径
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    port: 9000
  }
};