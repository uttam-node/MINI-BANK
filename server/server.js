const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const setupSocketIO = require('./socket');
const cron = require('node-cron');
const runDailySummaryJob = require('./jobs/aggregateDailySummary');
const connectDB = require('./config/db');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

connectDB(); // Connect DB here

// Attach Socket.IO logic
setupSocketIO(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`HTTP + WebSocket server running on port ${PORT}`);

    // Schedule cron job for daily summary
    cron.schedule('1 0 * * *', () => {
        console.log('[Cron] Running daily summary job...');
        runDailySummaryJob();
    });
});
