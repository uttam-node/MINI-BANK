const Trade = require('./models/Trade');

function setupSocketIO(io) {
    io.on('connection', (socket) => {
        console.log('[Socket] Client connected');

        socket.on('disconnect', () => {
            console.log('[Socket] Client disconnected');
        });
    });

    // MongoDB Change Stream: emit new trades
    const tradeStream = Trade.watch();

    tradeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const newTrade = change.fullDocument;
            io.emit('trade-update', newTrade);
        }
    });
}

module.exports = setupSocketIO;
