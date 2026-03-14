# 🇮🇳 Bharat Super App

**भारत सुपर ऐप** — One app for every Indian, in their language, at their pace, for every need.

- **Mobile:** React Native (Expo) — standalone app, **own `node_modules`**
- **Web:** React (Vite) — standalone app, **own `node_modules`**

Mobile and web are **separate projects**; each has its own dependencies and `node_modules`. No monorepo hoisting.

## Repository structure

| Path | Stack | node_modules |
|------|--------|--------------|
| `apps/mobile` | React Native + Expo (Expo Router) | `apps/mobile/node_modules` |
| `apps/web` | React + Vite + TypeScript | `apps/web/node_modules` |

## Quick start

**Requirement:** Node.js **20+** recommended (Expo SDK 55 and Vite 7 prefer Node 20).

```bash
# 1. Install dependencies for each app (separate node_modules)
npm run install:all
# Or install one at a time:
# npm run install:mobile
# npm run install:web

# 2. Run mobile (Expo) — uses apps/mobile/node_modules
npm run mobile

# 3. Run web — uses apps/web/node_modules
npm run web
```

Or run from each app directory:

```bash
cd apps/mobile && npm install && npm start
cd apps/web    && npm install && npm run dev
```

## Tech stack (from Product Vision)

### Mobile (Expo)
- **Framework:** React Native + Expo SDK
- **Routing:** Expo Router (file-based)
- **State:** Zustand, TanStack Query
- **UI:** NativeWind (Tailwind)
- **Animations:** React Native Reanimated
- **Language:** TypeScript

### Web
- **Framework:** React 18+
- **Build:** Vite
- **Routing:** React Router
- **UI:** Tailwind CSS
- **Language:** TypeScript

### Backend (to integrate)
- Supabase (Auth, DB, Realtime, Storage)
- WebRTC / mediasoup for calling
- Vernacular AI (LLaMA + Whisper)

## 13 feature modules (vision)

1. Social Profiles & Communication  
2. Audio & Video Calling  
3. News & World Updates  
4. FinTech & Payments  
5. Agri-Tech  
6. Hyperlocal Commerce & Delivery  
7. EdTech 2.0  
8. HealthTech for Bharat  
9. Creator Economy & Short Video  
10. EV & Green Tech  
11. GovTech — Government & Civic Services  
12. Gig Economy & Jobs  
13. Vernacular AI Assistant  

See `docs/` for architecture and module details.

## License

Confidential — Bharat Super App. Version 1.0 | March 2026.
