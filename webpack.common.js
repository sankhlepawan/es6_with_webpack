const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].dundle.js"
    },
    module: {
        rules : [
            {
                test: "/\.js$/",
                exclude: "/(node_modules)/",
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: "/\.(sa|sc|c)ss$/",
          
                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                     {
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader
                      }, 
                       {
                         // This loader resolves url() and @imports inside CSS
                         loader: "css-loader",
                       },
                       {
                         // Then we apply postCSS fixes like autoprefixer and minifying
                         loader: "postcss-loader"
                       },
                       {
                         // First we transform SASS to standard CSS
                         loader: "sass-loader",
                         options: {implementation: require("sass")}
                       }
                    ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
            }),
            new HtmlWebpackPlugin({
                title: 'demo webpack App',
            }),
            new MiniCssExtractPlugin({
                filename: "bundle.css"
              })
        ]
        
    
}