// server/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'MiniBank API',
        version: '1.0.0',
        description: 'MiniBank REST API with authentication, wallet, transactions, and real-time features.',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{ bearerAuth: [] }]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Point to routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
