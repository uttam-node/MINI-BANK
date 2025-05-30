const User = require('../models/User');

exports.getWalletBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('wallet');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ balance: user.wallet.balance });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
