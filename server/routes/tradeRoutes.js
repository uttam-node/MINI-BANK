const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// Test route to insert dummy trade
router.post('/add', async (req, res) => {
    try {
        const trade = await Trade.create(req.body);
        res.json(trade);
    } catch (err) {
        res.status(500).json({ message: 'Error inserting trade' });
    }
});

module.exports = router;
