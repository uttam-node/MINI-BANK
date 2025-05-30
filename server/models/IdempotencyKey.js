const mongoose = require('mongoose');

const idempotencyKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // TTL: 1 hour
});

module.exports = mongoose.model('IdempotencyKey', idempotencyKeySchema);
