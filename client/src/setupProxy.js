const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/arnbks', 
        { target: 'http://localhost:5000/' }
    ));
}