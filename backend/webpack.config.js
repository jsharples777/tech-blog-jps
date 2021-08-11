const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./dist/js/server.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../backend/public/js'),
  },
  resolve: {
    extensions: ['.tsx','.ts','.jsx','.js'],
    fallback: {"url":false},
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'source-map-loader',
      },
    ],

  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  }
};
