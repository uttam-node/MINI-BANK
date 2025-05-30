// middlewares/rateLimiter.js

const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

const rateLimitMap = new Map(); // Stores userId -> [timestamps]

function rateLimiter(req, res, next) {
    const userId = req.user; // Must come from JWT middleware

    if (!userId) return res.status(401).json({ message: 'Unauthenticated' });

    const now = Date.now();
    const requests = rateLimitMap.get(userId) || [];

    // Filter out timestamps outside the window
    const updatedRequests = requests.filter(ts => now - ts < WINDOW_SIZE_MS);
    updatedRequests.push(now);

    // Save updated timestamps
    rateLimitMap.set(userId, updatedRequests);

    if (updatedRequests.length > MAX_REQUESTS) {
        const retryIn = Math.ceil((WINDOW_SIZE_MS - (now - updatedRequests[0])) / 1000);
        return res.status(429).json({
            message: 'Too many requests. Please try again after ' + retryIn + ' seconds.',
        });
    }

    next();
}

module.exports = rateLimiter;
