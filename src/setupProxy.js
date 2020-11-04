const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/build/uploads', 
        { target: 'http://localhost:5000/' }
    ));
}