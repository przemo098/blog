const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ["./index.tsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].react-bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-react-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool:'source-map'
};
