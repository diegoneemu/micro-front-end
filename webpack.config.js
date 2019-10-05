const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const rules = [
  {
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: "babel-loader",
    query: {
      cacheDirectory: true,
      presets: ["@babel/env", "@babel/react", "@babel/typescript"],
      plugins: ["@babel/transform-runtime"]
    }
  }
];

module.exports = {
  target: "web",
  mode: "development",
  entry: {
    core: "./core/client/src/index.tsx",
    dc: "./dc-universe/client/src/index.tsx",
    sw: "./sw-fan-page/src/index.js",
    marvel: "./marvel-universe/client/src/index.tsx"
    /* commons: [
      "circular-dependency-plugin",
      "i18next",
      "moment",
      "react",
      "react-dom",
      "react-i18n",
      "react-i18next",
      "react-router-dom",
      "webpack-split-chunks"
    ] */
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name]~bundle.js"
  },
  devtool: "inline-source-map",
  module: { rules },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["core", "marvel", "vendors"]
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
      cwd: process.cwd()
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "./",
    port: 5000
  }
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: "~",
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: false
  //       }
  //     }
  //   }
  // }
};
