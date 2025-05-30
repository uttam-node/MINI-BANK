const Transaction = require('../models/Transaction');
const DailySummary = require('../models/DailySummary');

exports.getRecentTransactions = async (req, res) => {
    try {
        const userId = req.user;

        const transactions = await Transaction.find({
            $or: [{ from: userId }, { to: userId }]
        })
            .sort({ timestamp: -1 })
            .limit(50);

        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDailySummary = async (req, res) => {
    try {
        const userId = req.user;
        const date = req.params.date; // format: YYYY-MM-DD

        const summary = await DailySummary.findOne({ user: userId, date });

        if (!summary) return res.status(404).json({ message: 'No summary found' });

        res.json(summary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
