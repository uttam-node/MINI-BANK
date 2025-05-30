const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getRecentTransactions,
    getDailySummary
} = require('../controllers/transactionController');

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get last 50 transactions for the user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns list of transactions
 */
router.get('/', authMiddleware, getRecentTransactions);

/**
 * @swagger
 * /api/transactions/summary/{date}:
 *   get:
 *     summary: Get daily summary by date (YYYY-MM-DD)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: Date to get summary for (e.g. 2024-05-29)
 *     responses:
 *       200:
 *         description: Daily totals sent/received
 *       404:
 *         description: No summary found
 */
router.get('/summary/:date', authMiddleware, getDailySummary);

module.exports = router;
