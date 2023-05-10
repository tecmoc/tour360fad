const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: 'assets/[name][ext]'
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
       {
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg'
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            //loader: 'style-loader'
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tour 360 FAD",
      filename: "index.html",
      template: "src/template.html",
    }),
    new miniCssExtractPlugin()
    // new BundleAnalyzerPlugin(),
  ],
};