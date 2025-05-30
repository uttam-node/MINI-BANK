const mongoose = require('mongoose');
const User = require('../models/User');
const IdempotencyKey = require('../models/IdempotencyKey');
const Transaction = require('../models/Transaction');

exports.transferFunds = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { idempotencyKey, toUserEmail, amount } = req.body;
        const fromUserId = req.user;

        if (!idempotencyKey || !toUserEmail || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check for idempotency
        const existingKey = await IdempotencyKey.findOne({ key: idempotencyKey, userId: fromUserId });
        if (existingKey) {
            return res.status(200).json({ message: 'Duplicate request ignored (idempotent)' });
        }

        const fromUser = await User.findById(fromUserId).session(session);
        const toUser = await User.findOne({ email: toUserEmail }).session(session);

        if (!toUser) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Recipient not found' });
        }

        if (fromUser.wallet.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Perform balance transfer
        fromUser.wallet.balance -= amount;
        toUser.wallet.balance += amount;

        await fromUser.save({ session });
        await toUser.save({ session });

        // Record transaction
        await Transaction.create([{ from: fromUserId, to: toUser._id, amount }], { session });

        // Save idempotency key
        await IdempotencyKey.create([{ key: idempotencyKey, userId: fromUserId }], { session });

        await session.commitTransaction();
        session.endSession();

        res.json({ message: 'Transfer successful' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
