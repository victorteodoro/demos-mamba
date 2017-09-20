const config = require('../config')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const eslintFormatter = require('eslint-friendly-formatter')
const SassLintPlugin = require('sasslint-webpack-plugin')

module.exports = {
  entry: path.join(config.root, config.src.indexJS),
  output: {
    path: path.join(config.root, config.dist.root),
    filename: config.dist.name + '.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    symlinks: false // See https://github.com/webpack/webpack/issues/811
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          extends: 'tslint-config-standard'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          fix: false,
          formatter: eslintFormatter
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 1, // Copy fonts instead of inserting them on the css
          name: './fonts/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.join(config.root, path.join(config.src.assets, '[name].[ext]'))
        }
      }
    ]
  },
  devServer: {
    inline: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.join(config.root, config.src.assets),
        from: '**/*',
        to: path.join(config.dist.root, config.src.assets)
      }
    ]),
    new CopyWebpackPlugin([
      {
        context: path.join(config.root, config.lib.mambaWebSdk.assets),
        from: '**/*',
        to: path.join(config.root, path.join(config.dist.root, config.src.assets))
      }
    ]),
    new ExtractTextPlugin('test.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(config.root, config.src.indexHTML),
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new SassLintPlugin({
      glob: path.join(config.src.root, '/**/*.s?(a|c)ss')
    }),
    new ProgressBarPlugin()
  ]
}
