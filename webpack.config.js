var webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/app/js/app.js",
  },
  output: {
    path: "./dist/assets/app/js",
    filename: "[name].min.js",
    publicPath: "/assets/app/js/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(png|jpg|gif)/,
        loader: "file?name=../images/[name].[ext]"
      }
    ]
  }
}
