const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weypack",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};