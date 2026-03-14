# Bharat Super App — Technical Architecture

Version 1.0 | March 2026

## Overview

- **Mobile:** React Native (Expo) — iOS & Android, single codebase.
- **Web:** React (Vite) — TypeScript, Tailwind CSS, React Router.
- **Backend (to integrate):** Supabase (Auth, DB, Realtime, Storage), WebRTC/mediasoup for calling.

## Project layout (separate apps, separate node_modules)

Mobile and web are **independent projects**; each has its own `package.json` and `node_modules`. No shared dependency hoisting.

```
BharatSuperApp/
├── apps/
│   ├── mobile/             # React Native + Expo (Expo Router)
│   │   ├── package.json
│   │   └── node_modules/   # Mobile-only dependencies
│   └── web/                # React + Vite + TypeScript
│       ├── package.json
│       └── node_modules/   # Web-only dependencies
├── docs/
├── package.json            # Root: convenience scripts only (no workspaces)
└── README.md
```

## Mobile stack (Expo)

| Layer | Technology |
|-------|------------|
| Framework | React Native + Expo SDK |
| Routing | Expo Router (file-based) |
| State | Zustand (planned), TanStack Query (planned) |
| UI | NativeWind / StyleSheet (planned: NativeWind) |
| Animations | React Native Reanimated |
| Language | TypeScript |

## Web stack

| Layer | Technology |
|-------|------------|
| Framework | React 18+ |
| Build | Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS |
| Language | TypeScript |

## Backend & services (vision)

| Service | Technology |
|---------|------------|
| Auth & Identity | Supabase Auth + Aadhaar eKYC |
| Database | PostgreSQL (Supabase) |
| Real-time | Supabase Realtime + WebSocket |
| Video/Audio | mediasoup SFU + WebRTC |
| AI/NLP | Self-hosted LLaMA + Whisper (vernacular) |
| Storage | Supabase Storage / S3 |
| Push | FCM + APNs via Expo |

## Infrastructure (vision)

- **Primary:** AWS Mumbai (ap-south-1)
- **Failover:** AWS Hyderabad (ap-south-2)
- **Edge:** Cloudflare Workers
- **Orchestration:** Kubernetes (EKS)
- **CI/CD:** GitHub Actions + Expo EAS Build
- **Data:** Indian user data stored only in India (data sovereignty)

## Open-source components (vision)

- Messaging: Matrix Protocol + Element SDK
- Calling: WebRTC + mediasoup
- Mobile core: React Native + Expo (MIT)
- API Gateway: Kong / Traefik
- Database: PostgreSQL + Supabase
- Search: Meilisearch
- Identity: Keycloak + Aadhaar UIDAI
