const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/users', {
            target : 'http://210.104.6.82:8554/camconinfo',
            changeOrigin: true,
        }),
    );
};