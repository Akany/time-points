const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function(options) {
    const {mode} = options;
    const sourceMapEnabled = mode === 'development';

    return {
        mode,
        entry: './src/index.jsx',
        output: {
            filename: '[name].bundle.js'
        },
        devtool: sourceMapEnabled ? 'eval' : 'source-maps',
        module: {
            rules: [
                {
                    test: /(\.js|\.jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.module\.scss$/,
                    use: [
                        'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: sourceMapEnabled
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMapEnabled
                        }
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin(),
            new CleanWebpackPlugin()
        ]
    }
};