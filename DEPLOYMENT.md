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
| `BLOB_READ_WRITE_TOKEN` | Auto-added when you connect Vercel Blob storage |

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

## 6. Image uploads (Vercel Blob)

Admin image uploads (daily devotionals, flyers, bible plans, products) use **Vercel Blob** in production so files persist across deploys.

1. In your Vercel project, go to **Storage** → **Create Database/Store** → **Blob**.
2. Connect the Blob store to this project — Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
3. Redeploy after connecting.

**Local development:** Without `BLOB_READ_WRITE_TOKEN`, uploads save to `public/uploads/` on your machine.

Until Blob is configured on Vercel, you can paste image URLs pointing to `/public/images/` or external hosts when adding content in admin.

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
