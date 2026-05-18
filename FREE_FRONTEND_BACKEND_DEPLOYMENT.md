# Free Frontend + Backend Deployment

Use this if you want both:

```text
Angular frontend online
ASP.NET backend APIs online
Supabase/Postgres database connected
```

## Option A: One Free ASP.NET Host

This is the simplest if MonsterASP.NET works for your account:

```text
Angular + ASP.NET backend on MonsterASP.NET
Database on Supabase
```

Follow:

```text
MONSTERASP_DEPLOYMENT.md
```

The website and backend APIs are on the same link:

```text
https://your-site.runasp.net
https://your-site.runasp.net/api/Class
```

## Option B: Netlify Frontend + Backend Host

Use this if you want Netlify for the website and another free host for the ASP.NET backend.

Deploy backend first using MonsterASP.NET:

```text
MONSTERASP_DEPLOYMENT.md
```

Then deploy Angular on Netlify with these environment variables:

```text
API_BASE_URL=https://your-backend-site.runasp.net
```

Do not set `SUPABASE_URL` or `SUPABASE_ANON_KEY` in this option. The Angular website will call:

```text
https://your-backend-site.runasp.net/api/Class
```

The backend will connect to Supabase using:

```text
DATABASE_URL=your_supabase_postgres_connection_string
```

## Option C: Netlify + Supabase Direct

Use this only if you do not want backend hosting:

```text
NETLIFY_SUPABASE_DEPLOYMENT.md
```
