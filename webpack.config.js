const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "map-menu.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "mapmenu"
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/index.css", to: "map-menu.css" }]
    })
  ]
};
