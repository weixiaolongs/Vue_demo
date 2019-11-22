module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/my-app/',
    devServer: {
        // http://localhost:8080/api/tokens
        proxy: {
            '/api': {
                target: 'http://192.168.113.117:8080', // http://192.168.113.117:8080/api/tokens
                pathRewrite: {
                    // ^正则表达式里面开始符号  $正则表达式里面的结束符号
                    '^/api': '' // http://192.168.113.117:8080/tokens
                }
            }
        }
    }
}