const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const rateLimiter = require('./middlewares/rateLimiter');

const authMiddleware = require('./middlewares/authMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/wallet', authMiddleware, rateLimiter, require('./routes/walletRoutes'));

app.use('/api/transfer', authMiddleware, rateLimiter, require('./routes/transferRoutes'));

app.use('/api/transactions', authMiddleware, rateLimiter, require('./routes/transactionRoutes'));

app.use('/api/trades', authMiddleware, require('./routes/tradeRoutes'));

app.get('/', (req, res) => res.send('MiniBank API running'));

module.exports = app;
