module.exports = {
  context: __dirname + '/src',
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0'
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ]
  }
}
