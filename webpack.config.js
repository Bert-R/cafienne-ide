const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      "./node_modules/jquery/src/jquery.js",
      "./node_modules/bootstrap/dist/css/bootstrap.css",
    ],
    ide: [
      "./app/scripts/ide/ide.js",
      "./app/scripts/ide/ideheader.js",
      "./app/styles/ide/ide.css"
    ],
    repository: [
      "./app/scripts/repository/repository.js",
      "./app/scripts/repository/serverfile.js"
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'app/index.html'),
          to: path.resolve(__dirname, 'dist/index.html')
        },
        {
          from: path.resolve(__dirname, 'app/images/favicon.ico'),
          to: path.resolve(__dirname, 'dist/images/favicon.ico')
        }
      ]
    })
  ]
};
