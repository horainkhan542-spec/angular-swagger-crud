# Free Netlify + Supabase Deployment

Use this when you want a free website without Render, Railway, or ASP.NET hosting.

Netlify hosts the Angular website. Angular calls Supabase directly through the Supabase REST API.

## 1. Supabase

Use this project URL:

```text
https://pcvlfihieapjsbjjnzyy.supabase.co
```

In Supabase, copy:

```text
Project Settings > API > anon public key
```

For a simple school demo, make sure the school tables can be read/written by the anon key. The easiest demo setting is to keep Row Level Security off for these tables:

```text
SchoolClasses
Students
Teachers
Subjects
Attendances
Fees
Results
```

## 2. Netlify

1. Open `https://app.netlify.com/`.
2. Add new site from GitHub.
3. Select:

```text
horainkhan542-spec/angular-swagger-crud
```

4. Branch:

```text
bright-future-school-connected
```

5. Netlify will read `netlify.toml`.

## 3. Environment Variables

In Netlify site settings, add:

```text
SUPABASE_URL=https://pcvlfihieapjsbjjnzyy.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

Then deploy.

The final Netlify URL is the Angular website link.
