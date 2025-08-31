const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/app.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },

  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3000,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, // TypeScript loader
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // 👈 CSS loader (important: no exclude!)
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|woff2?|eot|ttf|otf)$/i, // asset loader
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
