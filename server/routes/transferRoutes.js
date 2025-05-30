const express = require('express');
const router = express.Router();
const { transferFunds } = require('../controllers/transferController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/transfer:
 *   post:
 *     summary: Transfer funds to another user (idempotent)
 *     tags: [Transfer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idempotencyKey:
 *                 type: string
 *               toUserEmail:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful or duplicate
 *       400:
 *         description: Invalid input or insufficient funds
 */

router.post('/', authMiddleware, transferFunds);

module.exports = router;
