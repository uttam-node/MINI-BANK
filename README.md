# 🏦 MiniBank – Full-Stack Real-Time Banking App

MiniBank is a full-stack banking simulation app built with **React**, **Node.js**, **MongoDB**, **Socket.IO**, and **Docker**. It supports:

✅ User registration & login  
✅ Wallet balance dashboard  
✅ Secure, idempotent fund transfers  
✅ Real-time trade feed via MongoDB Change Streams  
✅ Daily transaction summaries  
✅ Per-user rate limiting  
✅ Fully Dockerized with one-command startup

---

## 🚀 Demo URLs

> Replace with actual deployment links if hosted

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000/api](http://localhost:5000/api)
- API Docs (Swagger): [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 📦 Tech Stack

| Layer    | Tech Stack                                |
| -------- | ----------------------------------------- |
| Frontend | React, Tailwind CSS, Axios, React Router  |
| Backend  | Node.js, Express, MongoDB, JWT, Socket.io |
| Database | MongoDB (Replica Set, Change Streams)     |
| DevOps   | Docker, Docker Compose                    |

---

## 🧰 Features

### 🔐 Authentication

- Register/Login with email & password
- JWT-based secure auth

### 💰 Wallet Dashboard

- View real-time balance
- Track recent transactions

### 🔁 Fund Transfers

- Secure transfers between users
- Uses MongoDB Transactions
- Idempotency with `UUID` key to avoid double-send

### 📡 Real-Time Feed

- Trade feed powered by MongoDB Change Streams
- Updates all connected clients via WebSocket

### 📊 Daily Summaries

- Aggregated send/receive totals per user per day
- Auto-generated via scheduled cron job

### 🧱 Rate Limiting

- Each user is limited to **100 API requests per minute**
- Implemented using sliding window algorithm
- Returns `429 Too Many Requests` with retry time

---

## 🐳 Dockerized Setup

### ✅ Prerequisites

- Docker Desktop installed

### ▶️ One Command to Start All Services

```bash
docker-compose up --build
```

This spins up:

React app at http://localhost:3000

Express API at http://localhost:5000

MongoDB with Replica Set enabled

🧪 Testing
Backend

cd server
npm install
npm test

Tests written using:

Jest
Supertest
MongoMemoryServer

🗂 Folder Structure

Mini Bank/
├── client/ # React Frontend
├── server/ # Express Backend
├── docker-compose.yml
└── README.md

👩‍💻 Developer
Uttam Kumar

Email: uttamsingh9876@gmail.com

GitHub: [github.com/uttam](https://github.com/uttam-node)

Tech Stack: MERN, Docker, Microservices
