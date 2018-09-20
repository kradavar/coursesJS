var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './js/index.js',
    edit: './js/edit.js',
    create: './js/create.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};