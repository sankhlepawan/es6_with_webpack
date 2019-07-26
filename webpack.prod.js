const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  module : {
    rule: [
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
               {
                 // Using file-loader for these files
                 loader: "file-loader",
  
                 // In options we can set different things like format
                 // and directory to save
                 options: {
                   outputPath: 'fonts'
                 }
               }
             ]
      }
    ]
  }
})