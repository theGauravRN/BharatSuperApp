# BharatSuperApp — Credentials & Environment Variables

> ⚠️ **NEVER commit real secrets to this file. Use `.env.local` files for actual values.**
> This file documents which credentials are needed and where to set them.

---

## Frontend (`frontend/.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxx@sentry.io/xxxx
```

---

## Backend (`backend/.env`)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/bharat_db
REDIS_URL=redis://localhost:6379

# Supabase (Service Role — keep secret)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# SMS / OTP
MSG91_AUTH_KEY=your-msg91-key
MSG91_TEMPLATE_ID=your-template-id

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret

# AI / ML
OPENAI_API_KEY=sk-xxxx
GOOGLE_CLOUD_API_KEY=your-gcp-key

# AWS S3 (media storage)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=bharat-super-app-media
AWS_REGION=ap-south-1
```

---

## Admin Panel (`admin/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_SECRET_KEY=your-admin-secret
```

---

## Mobile (`mobile/.env`)

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_BASE_URL=https://api.bharatapp.in
```

---

## Where to Get Credentials

| Service | URL |
|---|---|
| Supabase | https://app.supabase.com |
| Razorpay | https://dashboard.razorpay.com |
| MSG91 | https://msg91.com/dashboard |
| PostHog | https://app.posthog.com |
| Sentry | https://sentry.io |
| AWS | https://console.aws.amazon.com |
| OpenAI | https://platform.openai.com |
| Google Cloud | https://console.cloud.google.com |
