var webpack = require('webpack');
module.exports = {
    entry : {
        index : "./index.js"
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
        output: {
        beautify: false,
        comments: false,
        }
      })
    ],
    devtool: 'source-map',
    output : {
        path : "./lib",
        filename : "bundle.js"
    },
    module : {
        loaders :[
            {test:/\.js$/, loader:'jsx-loader'}
        ]

    }
}
