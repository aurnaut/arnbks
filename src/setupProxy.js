const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/backend/uploads', 
        { target: 'http://localhost:5000/' }
    ));
}