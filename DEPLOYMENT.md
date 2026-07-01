# Deploying to Vercel with Neon PostgreSQL

SQLite does not work on Vercel (serverless functions have no persistent filesystem). This project uses **Neon PostgreSQL** instead.

## 1. Create a Neon database

1. Go to [https://neon.tech](https://neon.tech) and create a free account.
2. Create a new project (e.g. `glory-prayer-ministry`).
3. Open **Dashboard → Connection details**.
4. Copy two connection strings:
   - **Pooled connection** (host contains `-pooler`) → `DATABASE_URL`
   - **Direct connection** (no `-pooler`) → `DIRECT_URL`

Both URLs must include `?sslmode=require` at the end. Do **not** use `file:./dev.db` — that was SQLite and will not work.

> **Vercel:** Add both variables under Project → Settings → Environment Variables for **Production**, **Preview**, and **Development**. If `DATABASE_URL` is missing or still set to `file:./dev.db`, you will see: *"the URL must start with the protocol postgresql://"*.

Example:

```env
DATABASE_URL="postgresql://user:pass@ep-abc123-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-abc123.eu-west-2.aws.neon.tech/neondb?sslmode=require"
```

## 2. Set local environment variables

Copy `.env.example` to `.env` and fill in your Neon URLs plus:

```env
AUTH_SECRET="your-random-secret"   # run: openssl rand -base64 32
ADMIN_EMAIL="admin@gloryprayerministry.org"
ADMIN_PASSWORD="your-secure-password"
```

Run migrations and seed locally (optional, to verify):

```bash
npm install
npm run db:setup
npm run dev
```

## 3. Push code to GitHub

Ensure the repo is on GitHub (or GitLab/Bitbucket). Vercel deploys from git.

```bash
git add .
git commit -m "Configure Neon PostgreSQL for Vercel deployment"
git push origin main
```

## 4. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) → **Add New Project**.
2. Import your GitHub repository.
3. Framework preset: **Next.js** (auto-detected).
4. Add **Environment Variables** (Production, Preview, and Development):

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DIRECT_URL` | Neon **direct** connection string |
| `AUTH_SECRET` | Random secret (same as local) |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD` | Your admin login password |

5. Click **Deploy**.

The build runs `prisma migrate deploy` automatically, creating all tables in Neon.

## 5. Seed production data (first time only)

After the first successful deploy, seed the database from your machine (pointing at Neon):

```bash
# Ensure .env has your Neon DATABASE_URL and DIRECT_URL
npm run db:seed
```

This creates the admin user, sample products, devotionals, bible plans, and a flyer.

Then log in at: `https://your-site.vercel.app/admin/login`

## 6. Important: file uploads on Vercel

Admin image uploads currently save to `/public/uploads/`. **This does not persist on Vercel** (serverless storage is ephemeral).

For production uploads, use one of:

- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- Cloudinary, AWS S3, or similar

Until then, you can use image URLs pointing to files in `/public/images/` or external URLs when adding content in admin.

## Troubleshooting

| Issue | Fix |
|---|---|
| `Can't reach database server` | Check `DATABASE_URL` uses the **pooler** URL |
| Migration fails on build | Check `DIRECT_URL` is set and uses the **direct** (non-pooler) URL |
| Admin login fails | Run `npm run db:seed` against your Neon database |
| Build fails on Node version | Vercel → Settings → Node.js Version → **20.x** |

## Useful commands

```bash
npm run db:migrate      # Apply migrations (production)
npm run db:migrate:dev    # Create new migrations locally
npm run db:seed           # Seed admin + sample data
npm run build             # Same command Vercel runs
```
