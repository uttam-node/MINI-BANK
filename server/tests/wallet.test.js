const request = require('supertest');
const app = require('../app');
require('./setup');

let token;

beforeEach(async () => {
    await request(app).post('/api/auth/register')
        .send({ email: 'user1@test.com', password: '123456' });

    const res = await request(app).post('/api/auth/login')
        .send({ email: 'user1@test.com', password: '123456' });

    token = res.body.token;
});

describe('Wallet API', () => {
    it('should return wallet balance', async () => {
        const res = await request(app)
            .get('/api/wallet')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.balance).toBeDefined();
    });
});
