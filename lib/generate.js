const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = (report, outfile) => {
  // this should be configurable
  const output = process.cwd();

  const msf = new MemoryFileSystem();

  var compiler = webpack({
      entry: path.resolve(__dirname, '..', 'src', 'index.js'),
      context: path.resolve(__dirname, '..'),
      output: {
          path: output,
          filename: 'bundle.js'
      },
      module: {
          rules: [{
                  test: /\.css$/,
                  use: [{
                          loader: "style-loader"
                      },
                      {
                          loader: "css-loader"
                      }
                  ]
              },
              {
                  test: /\.js$/,
                  exclude: /node_modules(?!\/tap-html)/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                          presets: ['es2015', 'react']
                      }
                  }
              }
          ]
      },
      resolve: {
          extensions: [ '.js', '.json', '.jsx', '.css' ],
          modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
      },
      plugins: [
          new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
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
              filename: `${output}/tap-html.html`,
              inlineSource: '.(js|css)$',
              template: './src/template.html'
          }),
          new HtmlWebpackInlineSourcePlugin()
      ]
  });

  compiler.outputFileSystem = msf;

  compiler.run(function(err) {
      if (err) console.error(err); // eslint-disable-line
      const report = msf.readFileSync(path.resolve(output, 'tap-html.html'));
      if(outfile) {
        fs.writeFileSync(outfile, report);
      } else {
        console.log(report.toString('utf8')); // eslint-disable-line
      }
  });
}
