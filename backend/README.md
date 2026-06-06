# Portfolio API

Express + MongoDB backend for the Abdullah portfolio site.

## Setup

```bash
npm install
cp .env.example .env
# Fill MONGODB_URI, FIREBASE_* , ADMIN_EMAIL
npm run seed   # optional
npm run dev    # :5000
```

## API

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/portfolio` | Public |
| PUT | `/api/portfolio/:section` | Admin (Firebase token) |

Sections: `banner`, `about`, `services`, `experience`, `projects`, `contact`
