const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app.ts',
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(process.cwd(), 'dist')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'html - 模板文件'
        })
    ],
    // import的时候可以不需要带上文件后缀名
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}