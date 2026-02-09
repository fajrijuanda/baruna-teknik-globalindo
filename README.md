# Baruna Teknik Web

Next.js + Prisma project with PostgreSQL-compatible schema.
Schema Prisma tetap sama untuk semua environment (Supabase sekarang, VPS PostgreSQL nanti).

## 1) Local Setup

Copy template env:

```bash
cp .env.example .env
```

Then run:

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

## 2) Supabase + Vercel (Online Trial)

Set environment variables in Vercel:

- `DATABASE_URL`: Supabase **pooler** URL (port `6543`) with `sslmode=require`.
- `DIRECT_URL`: Supabase **direct** URL (port `5432`) with `sslmode=require`.
- `AUTH_SECRET`: random strong secret.
- `NEXT_PUBLIC_APP_URL`: your Vercel URL/domain.

Important:
- App runtime on Vercel uses `DATABASE_URL` (pooler) to reduce connection issues.
- Migration/DDL should use `DIRECT_URL`.

Before first deploy, initialize schema to Supabase database from local/CI:

```bash
npm run db:push
npm run db:seed
```

Build already includes Prisma generate:

```bash
npm run build
```

## 3) Move Later to VPS PostgreSQL

Tidak perlu mengubah `prisma/schema.prisma`.
Saat pindah, cukup ganti:

- `DATABASE_URL` -> URL PostgreSQL VPS
- `DIRECT_URL` -> URL PostgreSQL VPS (boleh sama)

Lalu jalankan:

```bash
npm run db:push
# atau kalau sudah pakai migration folder:
npm run db:migrate:deploy
```

## Available Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run db:push`
- `npm run db:seed`
- `npm run db:migrate:deploy`
