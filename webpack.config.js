const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/wasm/*.wasm',
        to: 'wasm/[name].wasm'
      },
      {
        from: 'src/index.html',
        to: 'index.html'
      }
    ])
  ],
  mode: 'development'
}
