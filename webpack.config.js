const nodeExternals = require("webpack-node-externals");
const path = require("path");

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const css = {
  test:/\.css$/,
  use:['style-loader','css-loader']
}

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "index.js"),
  },
  module: {
    rules: [js, { test: /\.(scss|css)$/, loader: "ignore-loader" }],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name]",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    "index.js": path.resolve(__dirname, "client/src/public/index.js"),
  },
  module: {
    rules: [js, css],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: path.resolve(__dirname, "build/public"),
    filename: "[name]",
  },
};

module.exports = [serverConfig, clientConfig];
