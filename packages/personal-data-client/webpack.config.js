const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function(options) {
    const {mode} = options;
    const sourceMapEnabled = mode === 'development';

    return {
        mode,
        entry: './src/index.js',
        output: {
            filename: '[name].bundle.js'
        },
        devtool: sourceMapEnabled ? 'eval' : 'source-maps',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /\.module\.scss$/,
                    use: [
                        'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMapEnabled
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMapEnabled
                        }
                    }]
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
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpe?g)$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]'
                        }
                      }
                    ]
                  }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}}),
            new CleanWebpackPlugin()
        ],
        devServer: {
            host: '0.0.0.0',
            port: process.env.PORT
        }
    }
};