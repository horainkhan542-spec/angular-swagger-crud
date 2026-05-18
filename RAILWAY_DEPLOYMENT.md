# Railway Deployment

Use this option if Render asks for a card and you already have a Railway project with PostgreSQL.

## GitHub Source

```text
Repo: horainkhan542-spec/angular-swagger-crud
Branch: bright-future-school-connected
```

## Service Settings

```text
Root Directory: blank
Dockerfile Path: Dockerfile
Health Check Path: /healthz
```

The repository includes `railway.json`, so Railway can also read these settings automatically.

## Variables

In the `bright-future-school` Railway service, add:

```text
DATABASE_URL=${{Postgres-knNb.DATABASE_URL}}
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_HTTP_PORTS=8080
```

If Railway gives a different Postgres service name, replace `Postgres-knNb` with that exact service name.

## Deploy

Deploy the `bright-future-school` service from GitHub. After it finishes, open the generated Railway domain.

API test:

```text
https://your-railway-domain.up.railway.app/api/Class
```
