const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(process.cwd(), 'dist')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }, {
            test: /\.js$/i,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'ts demo - 计算器',
            template: './public/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}