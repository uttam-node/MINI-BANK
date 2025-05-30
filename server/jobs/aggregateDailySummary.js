const Transaction = require('../models/Transaction');
const DailySummary = require('../models/DailySummary');
const moment = require('moment');

const runDailySummaryJob = async () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const start = moment(yesterday).startOf('day').toDate();
    const end = moment(yesterday).endOf('day').toDate();

    // Group total sent/received by user
    const results = await Transaction.aggregate([
        {
            $match: {
                timestamp: { $gte: start, $lte: end }
            }
        },
        {
            $facet: {
                sent: [
                    { $group: { _id: '$from', totalSent: { $sum: '$amount' } } }
                ],
                received: [
                    { $group: { _id: '$to', totalReceived: { $sum: '$amount' } } }
                ]
            }
        }
    ]);

    const sentMap = new Map(results[0].sent.map(e => [e._id.toString(), e.totalSent]));
    const receivedMap = new Map(results[0].received.map(e => [e._id.toString(), e.totalReceived]));

    const userIds = new Set([...sentMap.keys(), ...receivedMap.keys()]);

    for (const userId of userIds) {
        const totalSent = sentMap.get(userId) || 0;
        const totalReceived = receivedMap.get(userId) || 0;

        await DailySummary.updateOne(
            { user: userId, date: yesterday },
            { user: userId, date: yesterday, totalSent, totalReceived },
            { upsert: true }
        );
    }

    console.log(`[Cron] Daily summary updated for ${yesterday}`);
};

module.exports = runDailySummaryJob;
