const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkerPlugin = require('worker-plugin')
const webpack = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin')

const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'
const isDev = !prod
const dev = !prod

module.exports = {
  entry: {
    bundle: ['./index.js'],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + (!prod ? '/public' : "/dist"),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    globalObject: 'self',
  },
  module: {
    rules: [{
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader-hot',
          options: {
            onwarn: () => {},
            dev,
            hotReload: true,
            emitCss: true,
            preprocess: require('svelte-preprocess')({
              postcss: {
                plugins: [
                  require("tailwindcss"),
                ],
              },
            }),
            hotOptions: {
              // whether to preserve local state (i.e. any `let` variable) or
              // only public props (i.e. `export let ...`)
              noPreserveState: false,
              // optimistic will try to recover from runtime errors happening
              // during component init. This goes funky when your components are
              // not pure enough.
              optimistic: true,

              // See docs of svelte-loader-hot for all available options:
              //
              // https://github.com/rixo/svelte-loader-hot#usage
            },
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          !isDev ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },

    ],
  },
  mode,
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WorkerPlugin(),
    ...(prod ? [

      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),

      new HtmlWepackPlugin()

    ] : [])
  ],

  optimization: {
    usedExports: true,
  },
  devtool: prod ? false : 'source-map',
  devServer: {
    contentBase: 'public',
    hot: true,
    overlay: true,
    clientLogLevel: "error",
    historyApiFallback: true
  },
}