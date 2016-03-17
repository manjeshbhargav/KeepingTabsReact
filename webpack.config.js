var path = require('path'),
    buildConfig = require('./buildConfig.json'),
    ReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  entry: {
    background: path.join(__dirname, 'src/background/entry.jsx'),
    popup: path.join(__dirname, 'src/popup/entry.jsx')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname,'build/crx')
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    root: [
      path.join(__dirname, 'src'),
      __dirname
    ],
    alias: {
      'Tab': 'Tab/index',
      'Tabs': 'Tabs/index',
      'TabsFilter': 'TabsFilter/index'
    }
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0'
          ],
          plugins: [
            'babel-plugin-transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.jsx$/,
        loader: ReplacePlugin.replace({
          replacements: [
            {
              pattern: /__([a-zA-Z0-9_\-]+)__/g,
              replacement: function (match, p1) {
                return buildConfig[p1];
              }
            }
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ReplacePlugin()
  ]
};
