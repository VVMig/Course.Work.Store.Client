/* eslint-disable no-undef */
const path = require('path');

const port = process.env.PORT ?? 8080;

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
    },
};
