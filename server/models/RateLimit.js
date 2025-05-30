const mongoose = require('mongoose');

const rateLimitSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    timestamps: [Date]
}, {
    timestamps: true
});

rateLimitSchema.index({ 'timestamps': 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model('RateLimit', rateLimitSchema);
