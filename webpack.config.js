const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@function': path.resolve(__dirname, './src', 'function'),
      '@core/config': path.resolve(__dirname, './src', 'core', 'config'),
      '@constants': path.resolve(__dirname, './src', 'core', 'constants'),
      '@entities': path.resolve(__dirname, './src', 'core', 'entities'),
      '@enums': path.resolve(__dirname, './src', 'core', 'enums'),
      '@factories': path.resolve(__dirname, './src', 'core', 'factories'),
      '@interfaces': path.resolve(__dirname, './src', 'core', 'interfaces'),
      '@middlewares': path.resolve(__dirname, './src', 'core', 'middlewares'),
      '@repositories': path.resolve(__dirname, './src', 'core', 'repositories'),
      '@services': path.resolve(__dirname, './src', 'core', 'services'),
      '@validators': path.resolve(__dirname, './src', 'core', 'validators'),
      '@types': path.resolve(__dirname, './src', 'config', 'types'),
      '@utils': path.resolve(__dirname, './src', 'config', 'util'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
};
