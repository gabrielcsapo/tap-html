const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const BabiliPlugin = require('babel-minify-webpack-plugin');

module.exports = (report, outfile) => {
  // this should be configurable
  const output = path.dirname(outfile) || process.cwd();

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
              presets: ['env', 'react']
            }
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
          }]
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: "file-loader"
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.css'],
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new BabiliPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        },
        report: JSON.stringify(report)
      }),
      new HtmlWebpackPlugin({
        filename: outfile || `${output}/tap-html.html`,
        inlineSource: '.(js|css|eot|woff2|woff|ttf|svg)$',
        template: './src/template.html'
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  });

  if(!outfile) {
    const msf = new MemoryFileSystem();
    compiler.outputFileSystem = msf;
  }

  compiler.run(function(err) {
    if (err) console.error(err); // eslint-disable-line
    if (outfile) {
      try {
        fs.unlinkSync(path.resolve(output, 'bundle.js'));
      } catch(ex) {
        // noop
      }
    } else {
      console.log(msf.readFileSync(path.resolve(output, 'tap-html.html')).toString('utf8')); // eslint-disable-line
    }
  });
}
