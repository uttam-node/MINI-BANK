const request = require('supertest');
const app = require('../app');
const { v4: uuidv4 } = require('uuid');
require('./setup');

let token1, token2;

beforeEach(async () => {
    await request(app).post('/api/auth/register').send({ email: 'a@a.com', password: '123' });
    await request(app).post('/api/auth/register').send({ email: 'b@b.com', password: '123' });

    const res1 = await request(app).post('/api/auth/login').send({ email: 'a@a.com', password: '123' });
    const res2 = await request(app).post('/api/auth/login').send({ email: 'b@b.com', password: '123' });

    token1 = res1.body.token;
    token2 = res2.body.token;
});

describe('Transfer API', () => {
    it('should perform transfer with idempotency key', async () => {
        const key = uuidv4();

        const res = await request(app)
            .post('/api/transfer')
            .set('Authorization', `Bearer ${token1}`)
            .send({ idempotencyKey: key, toUserEmail: 'b@b.com', amount: 100 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Transfer successful|Duplicate/);
    });

    it('should fail with insufficient balance', async () => {
        const key = uuidv4();

        const res = await request(app)
            .post('/api/transfer')
            .set('Authorization', `Bearer ${token1}`)
            .send({ idempotencyKey: key, toUserEmail: 'b@b.com', amount: 999999 });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/Insufficient/);
    });
});
