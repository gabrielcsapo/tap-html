const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const tmp = require('tmp');
const path = require('path');

module.exports = (report, output) => {
    var workingDirectory = path.dirname(report.path || process.cwd());
    tmp.dir({ unsafeCleanup: true }, function _tempDirCreated(err, dir, cleanupCallback) {
      if(err) throw new Error(err);

      webpack({
          entry: path.resolve(__dirname, '..', 'src', 'index.js'),
          context: __dirname,
          output: {
            publicPath: dir,
            path: dir,
        		filename: "bundle.js"
          },
          module: {
              loaders: [{
                      test: /\.css$/,
                      loaders: ['style-loader', 'css-loader']
                  },
                  {
                      test: /.jsx?$/,
                      loader: 'babel-loader',
                      exclude: /node_modules(?!\/tryitout)/,
                      query: {
                          presets: ['es2015', 'react']
                      }
                  },
              ],
          },
          resolve: {
              modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
          },
          plugins: [
              new webpack.DefinePlugin({
                  'process.env': {
                      'NODE_ENV': JSON.stringify('production')
                  },
                  report: JSON.stringify(report)
              }),
              new webpack.HotModuleReplacementPlugin(),
              new webpack.optimize.UglifyJsPlugin({
                  comments: false,
                  compress: {
                      unused: true,
                      dead_code: true,
                      warnings: false,
                      drop_debugger: true,
                      conditionals: true,
                      evaluate: true,
                      sequences: true,
                      booleans: true,
                  }
              }),
              new webpack.optimize.AggressiveMergingPlugin(),
              new HtmlWebpackPlugin({
                filename: `${process.cwd()}/tap-html.html`,
                inlineSource: '.(js|css)$',
                template: '../src/template.html'
              }),
              new HtmlWebpackInlineSourcePlugin()
          ]
      }, function(err, stats) {
          console.log(err);
          cleanupCallback();
      });
    });
}
