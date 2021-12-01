const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/SimpleReactUI/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/SimpleReactUI/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: "./dist",
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
  },
};
