const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    wallet: {
        balance: { type: Number, default: 1000 } // Default wallet balance
    }
});

module.exports = mongoose.model('User', userSchema);
