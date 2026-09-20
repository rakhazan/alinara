# Alinara: Neon + Vercel

## What is implemented

- Drizzle PostgreSQL schema and versioned SQL migration for catalog, CMS content, orders, order lines, and checkout rate limits.
- Neon WebSocket driver with request-scoped pools, closed in `finally`. Checkout uses interactive transactions.
- `/admin` session protection and authenticated, same-origin mutation endpoints. One bootstrap administrator uses a random access key; this is not a multi-user identity system.
- Published catalog/CMS entries render on the public site. The browser cart uses the current server catalog.
- Guest orders use server prices, transactional stock checks, idempotency keys, and a 10-attempt / 10-minute limiter. Cancellation restores stock once. Order status does not imply payment.
- No database configured: public demo catalog and local admin demo (development only). Production admin is closed unless credentials are configured.

## Configure locally

Copy `.env.example` to `.env.local`. Set:

- `DATABASE_URL`: Neon pooled connection string with TLS (copy from Neon Connect).
- `DATABASE_URL_UNPOOLED`: direct connection string for migrations; optional fallback to `DATABASE_URL`.
- `ADMIN_ACCESS_KEY`: unique random secret, generated with `openssl rand -hex 32`.
- `AUTH_SECRET`: a different random secret generated the same way.
- `CHECKOUT_ENABLED=false` initially.
- `SHIPPING_FLAT_RATE`: actual flat shipping price in integer IDR, e.g. your approved shipping fee. Do not set an arbitrary fee for customers.

Keep secrets out of Git and out of `NEXT_PUBLIC_*`. Rotating `AUTH_SECRET` invalidates existing admin sessions. Sessions expire after eight hours.

```sh
bun install --frozen-lockfile
bun --env-file=.env.local run db:migrate
bun --env-file=.env.local run db:seed
bun run dev
```

Seed is optional, inserts **draft** examples, and preserves existing records. Visit `/admin/login`, enter the access key, review real product data and stock, then publish. Archived products become drafts instead of being deleted so historical order lines remain valid. Stock is currently shared across a product's colors.

CMS supports banners, categories, featured collections, a featured journal entry, testimonials, and community images. The most recently updated published journal entry is featured. Existing site sections with no published content remain empty; an empty database does not fall back to fake published data.

Images currently use local paths under `public/`. A media-upload/object-storage integration is still required for non-developer image uploads. No remote image hosts are implicitly allowed.

## Deploy on Vercel

1. Import the Git repository into Vercel; choose the Next.js framework and Node.js 22.
2. Install command: `bun install --frozen-lockfile`. Build: `bun run build`. Output directory: Next.js default.
3. Add the server environment variables above to the appropriate Vercel environment. Use a separate Neon branch/database for Preview; never point Preview at production orders.
4. Run `db:migrate` against the intended database from a trusted local/CI environment before publishing the application. Migrations are deliberately **not** attached to every preview build.
5. Deploy, then verify login/logout, publish one product, browse `/products`, add it to the cart, and inspect the checkout-disabled state.
6. Enable checkout only after real catalog/stock, shipping fee, admin order handling, and customer policies are ready. Set `CHECKOUT_ENABLED=true` and redeploy.

The `/api/checkout` endpoint creates an **unpaid, pending** order. There is no payment gateway, payment webhook, invoice email, or courier integration yet. Pending orders reserve stock until an administrator cancels or processes them; there is no automatic expiry worker yet. Review `/admin/orders` regularly. Do not describe a confirmed order as paid.

Vercel supplies the forwarded client IP used for checkout throttling. If hosting behind a different proxy, configure trusted proxy handling before enabling checkout. Configure Vercel Firewall rate limits for `/api/admin/session` as defense in depth for the bootstrap login. Use a randomly generated access key, not a human password.

## Validation

```sh
bun run lint
bun run typecheck
bun run test
bun run build
```

Tests run the actual SQL migration and order transaction functions on embedded PostgreSQL (PGlite), including stock rollback, idempotency, and cancellation. PGlite serializes local transactions: its concurrent test is a regression check, **not** proof of distributed Neon concurrency. Test concurrent checkout on a Neon staging branch before launch.

In the current constrained local environment Turbopack could not create its CSS worker port; `bun run build --webpack` was used successfully as a production-build fallback. Google Fonts requires build-time network access.

## Remaining production integrations

Neon credentials/live migration and deployment, payment provider/webhooks, transactional email, shipping calculation, real assets/content, media uploads, product review submission/moderation, individual staff accounts, customer accounts, automatic pending-order expiry, and monitoring/backups policy.

No database migration or live deployment was executed during implementation because environment credentials were not supplied.

References: [Drizzle Neon driver](https://orm.drizzle.team/docs/connect-neon), [Neon with Vercel](https://neon.com/docs/guides/vercel-manual).
