import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Microservices routes
//keto vendosen dreperdrejte ne IIS - IIS Proxy, Routing , nginx
const services = {
    '/orders': 'http://localhost:3000/api/v1/orders', // Microservice 1
    '/inventories': 'http://localhost:3001/inventories', // Microservice 2
};

// Proxy setup
for (const [path, target] of Object.entries(services)) {
    app.use(path, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: (path) => path.replace(path, ''), // Optionally rewrite path
    }));
}

// Catch all route to indicate incorrect paths
app.use((req, res) => {
    res.status(404).send('Service not found');
});

// Start the proxy server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
