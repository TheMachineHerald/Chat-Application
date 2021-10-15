module.exports = {
  entry: './src/frontend/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }
    ]
  },
};