# Abdullah Portfolio

Monorepo — frontend ও backend আলাদা folder-এ।

```
abdullah-protfolio-client/
├── frontend/                 # React + Vite (public site + admin dashboard)
│   ├── src/
│   ├── public/
│   ├── scripts/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example          # copy → .env.local
│   └── vercel.json           # Vercel SPA rewrites
│
├── backend/                  # Express + MongoDB API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── data/
│   ├── scripts/
│   ├── package.json
│   └── .env.example          # copy → .env
│
├── firebase.json             # Hosting → frontend/dist
├── .firebaserc
├── package.json              # root scripts only
└── README.md
```

## Local development

**1. Backend** (Terminal 1)

```bash
cd backend
copy .env.example .env
# .env এ MongoDB URI + Firebase Admin credentials দিন
npm install
npm run seed    # optional — first-time data
npm run dev     # http://localhost:5000
```

**2. Frontend** (Terminal 2)

```bash
cd frontend
copy .env.example .env.local
# Firebase client keys + VITE_API_URL=http://localhost:5000
npm install
npm run dev     # http://localhost:5173
```

**Root থেকে:**

```bash
npm run dev            # frontend
npm run dev:backend    # backend
npm run build          # frontend/dist
```

## Git push (প্রথমবার বা update)

```bash
git add .
git status
git commit -m "Organize monorepo: frontend + backend"
git push origin main
```

**Commit করবেন না:** `.env`, `.env.local`, `node_modules/`, `frontend/dist/`

## Deploy

| Service | Setting |
|---------|---------|
| **Vercel** (frontend) | Root Directory = `frontend` |
| **Vercel env** | `VITE_API_URL` = backend URL |
| **Backend** | Railway / Render — `CLIENT_URL` = frontend URL |
| **Firebase Hosting** | Root থেকে `npm run build` → `firebase deploy --only hosting` |

## Stack

- **Frontend:** React 19, Vite, Tailwind v4, Firebase Auth, ImgBB
- **Backend:** Express, MongoDB, Firebase Admin (token verify)
