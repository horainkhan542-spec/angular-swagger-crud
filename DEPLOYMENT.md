# Render Deployment

If Render asks for a card or paid plan, use `MONSTERASP_DEPLOYMENT.md` instead. That route is free ASP.NET Core hosting with Supabase as the database.

This project is prepared for a single Render deployment:

- Angular frontend is built inside Docker.
- ASP.NET Core API serves the Angular files and `/api/*` endpoints from the same domain.
- PostgreSQL is created from `render.yaml` as a free Render database.

## Deploy With Render Blueprint

1. Push this repository to GitHub.
2. Open Render and sign in with the GitHub account that has access to this repo.
3. Choose **New +** > **Blueprint**.
4. Select this repository.
5. Render will read `render.yaml` and create:
   - `bright-future-school` web service
   - `bright-future-school-db` PostgreSQL database
6. Click **Apply** / **Deploy**.

After deployment, open the web service URL. The Angular app and API will both run on the same Render URL.

## Important Free-Tier Note

Render free web services sleep after inactivity, so the first request after a pause can take around a minute. Render free PostgreSQL databases expire after 30 days, so use Neon or Supabase for a longer-lived free database. push to 

## Use Supabase As The Database

Supabase is used here as the PostgreSQL database. It does not host the Angular/ASP.NET app by itself, so the website link should still come from Render or another app host.

1. Open the Supabase project.
2. Go to **Project Settings** > **Database**.
3. Copy the pooled connection string. It usually looks like:

```text
postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres
```

4. In Render, open the `bright-future-school` web service.
5. Go to **Environment** and set:

```text
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
```

6. Redeploy the service.

The backend automatically runs Entity Framework migrations on startup, so the school tables will be created in Supabase when the deployed API starts.

Then remove or ignore the free database created by the Blueprint. If you are deploying Angular separately from the ASP.NET API, set `ALLOWED_ORIGINS` on the API service to the Angular website URL, for example:

```text
ALLOWED_ORIGINS=https://your-angular-site.vercel.app
```

In that separate-hosting setup, also update `src/environments/environment.prod.ts` before building Angular:

```ts
export const environment = {
  apiBaseUrl: 'https://your-api-service.onrender.com',
};
```
