const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // build for production

  entry: "./src/app.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // clear old files
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // your main HTML
    }),
  ],
};
