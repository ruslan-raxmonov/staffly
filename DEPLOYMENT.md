# Staffly Deployment Guide

## Database Setup (Supabase)

1. **Connect Supabase to Vercel**
   - Vercel dashboard → Storage → Connect Supabase
   - This will automatically set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

2. **Run SQL Migration**
   - Copy the contents of `migrations/001_initial_schema.sql`
   - Go to Supabase Dashboard → SQL Editor
   - Paste and execute the migration

3. **Verify Tables**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   Should show: applications, users, organizations, workspaces, emails, activity, notifications

## Environment Variables (Vercel)

Required environment variables (auto-set by Supabase integration):
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key (server-side only)

## Local Development

1. Get Supabase credentials from Vercel dashboard
2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

Without Supabase env vars, the app will fallback to local filesystem storage (data/applications.json).

## Deploy

```bash
git add .
git commit -m "Add Supabase database layer"
git push
```

Vercel will auto-deploy. The app will use Supabase in production automatically.

## Testing the Flow

1. Submit access request → creates application with `email_pending` status
2. Verify email → status changes to `pending`
3. Admin approves → status `approved`, creates org/workspace/user
4. Check admin panel → should see the request

## Troubleshooting

**"Applications not showing in admin panel"**
- Check Supabase logs in dashboard
- Verify env vars are set in Vercel
- Check browser console for errors

**"TypeScript errors"**
- Run `npm install` to ensure @supabase/supabase-js is installed
- Restart dev server

**"Database connection failed"**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is the service role key (not anon key)
- Check Supabase project is active (not paused)
