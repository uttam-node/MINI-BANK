const request = require('supertest');
const app = require('../app');
require('./setup');

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'pass123' });

        expect(res.statusCode).toBe(201);
    });

    it('should login and return a token', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'pass123' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'pass123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
