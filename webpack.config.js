const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");
dotenv.config();

const server = {
  entry: path.resolve("./src/main.ts"),
  mode: process.env.NODE_ENV || "production",
  output: {
    path: path.resolve("./dist"),
    filename: "server.js"
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new NodemonPlugin({
      nodeArgs: [
        "-r", "dotenv/config",
        "-r", "source-map-support/register",
        ... (process.env.DEBUG === "true") ? [
          "--inspect-brk"
        ] : []
      ],
      script: "dist/server.js",
      outDir: "dist"
    })
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  externals: [nodeExternals()],
  devtool: "source-map",
  target: "node"
};

module.exports = server;
