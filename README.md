# ARMY Voting Hub

A mobile-first voting mission hub for BTS ARMY. The app centralises current award guides, routes users to official voting platforms, accepts official confirmation/certificate proof, tracks verified activity and displays digital credentials.

## What is included

- Public voting information pages for Kids’ Choice Awards, ARIA Awards, AAA and MAMA
- Region-aware daily missions (Australia vs international ARIA routing)
- Nickname/email/password registration through Supabase Auth
- Private proof image storage and X post URL submissions
- Moderator approval / rejection / resubmission workflow
- KST, AEDT and local mission-day keys
- Daily progress, verified mission history and AAA quantity tracking
- Digital badge/credential progress
- Mobile bottom navigation and desktop sidebar
- GitHub Pages deployment workflow
- Demo mode for interface testing before Supabase is connected
- SQL schema and RLS policies

## Important product guardrail

This hub **never casts or automates votes**. Every vote is completed on the official third-party platform. The app must never collect passwords for Mnet Plus, X, Spotify, IDOLCHAMP, Nickelodeon or another voting platform.

## Preview locally

No build step is required.

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

With the included `config.js`, the app runs in **Preview mode**. Create a local demo account, submit proof, open Admin, approve it, and the mission/badge state will update. Demo data remains in that browser only.

## Create the Supabase backend

1. Create a new Supabase project.
2. In **SQL Editor**, run `supabase/schema.sql`.
3. In Authentication settings, enable email/password sign-in and configure the Site URL to the eventual GitHub Pages URL.
4. Decide who should be an admin. After that person signs up, run:

```sql
update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL';
```

The schema creates a private `proofs` storage bucket, RLS policies and a moderator-only `review_proof` RPC.

## Connect the frontend

Edit `config.js`:

```js
window.APP_CONFIG = {
  appName: 'ARMY Voting Hub',
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR_PUBLIC_ANON_KEY',
  demoMode: false,
  proofBucket: 'proofs',
  evidenceRetentionDays: 30
};
```

The Supabase anon key is designed to be public in browser clients. Security is enforced by RLS. Never put the Supabase **service role key** in this repository or browser code.

## Deploy to GitHub Pages

1. In repository **Settings → Pages**, set Source to **GitHub Actions**.
2. Push to `main`. The included workflow will publish the static site.

Because routing uses URL hashes (`#today`, `#voting`, etc.), GitHub Pages does not need SPA rewrite rules.

## Before public launch

- Recheck every voting rule, date, hashtag and official link.
- Upload moderator examples of acceptable confirmation screens.
- Confirm the live IDOLCHAMP vote mechanics before publishing campaign copy.
- Test MAMA reset behaviour around 00:00 KST and ARIA daily routing around AEDT.
- Publish final legal/privacy text appropriate to your jurisdiction and audience.
- Configure evidence deletion/retention operationally.
- Test accessibility with keyboard navigation and a screen reader.

## Visual/legal note

The interface uses original purple/indigo mission-passport styling. It intentionally does not contain the BTS logo, ARMY logo, member photographs, BT21 characters, album artwork or award logos.
