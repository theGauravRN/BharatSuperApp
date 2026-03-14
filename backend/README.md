# BharatSuperApp — Backend API

Core backend services and APIs powering BharatSuperApp.

## Stack (Planned)
- **Runtime**: Node.js 20 + TypeScript
- **Framework**: Fastify / Express
- **Database**: PostgreSQL (via Supabase) + Redis (cache)
- **Auth**: Supabase Auth + JWT
- **Storage**: Supabase Storage / AWS S3
- **Queue**: BullMQ (background jobs)
- **AI/ML**: Python microservices for AI features

## Services
- `api/` — REST + GraphQL API gateway
- `services/social` — Feed, posts, stories
- `services/fintech` — UPI, payments, loans
- `services/agri` — Mandi prices, crop advisory
- `services/health` — Teleconsultation, ABDM
- `services/ai` — Vernacular NLP, voice processing
- `services/notifications` — Push, SMS, WhatsApp

## Setup
```bash
cd backend
npm install
npm run dev
```
