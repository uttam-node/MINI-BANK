const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String }, // Format: YYYY-MM-DD
    totalSent: Number,
    totalReceived: Number
});

module.exports = mongoose.model('DailySummary', dailySummarySchema);
