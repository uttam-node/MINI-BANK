const express = require('express');
const router = express.Router();
const { getWalletBalance } = require('../controllers/walletController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/wallet:
 *   get:
 *     summary: Get current user’s wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user’s wallet balance
 */

router.get('/', authMiddleware, getWalletBalance);

module.exports = router;
