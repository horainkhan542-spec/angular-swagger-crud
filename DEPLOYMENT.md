# Render Deployment

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

Render free web services sleep after inactivity, so the first request after a pause can take around a minute. Render free PostgreSQL databases expire after 30 days, so use Neon or Supabase for a longer-lived free database.

To use Neon or Supabase instead, set the web service environment variable:

```text
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
```

Then remove or ignore the free database created by the Blueprint.
