const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: "eval",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
   },
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist')
  }
};
