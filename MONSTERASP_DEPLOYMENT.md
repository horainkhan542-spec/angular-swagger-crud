# Free Deployment With MonsterASP.NET

Use this option if Render asks for a card or paid plan.

MonsterASP.NET offers free ASP.NET Core hosting with no credit card. Supabase will still be used as the PostgreSQL database.

## 1. Create Free Hosting

1. Open `https://www.monsterasp.net/ASP.NET-Freehosting/`.
2. Create a free account.
3. Create a free ASP.NET Core website.
4. Keep the free subdomain they give you, for example:

```text
your-site.runasp.net
```

## 2. Set Database Environment Variable

In the hosting control panel, add an environment variable:

```text
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@HOST:6543/postgres
```

Use the Supabase pooled PostgreSQL connection string.

## 3. Publish The Project

Run this from the repository root:

```powershell
.\publish-monsterasp.ps1
```

This creates:

```text
publish\monsterasp.zip
```

## 4. Upload

Upload the contents of `publish\monsterasp.zip` to the free MonsterASP.NET site using their file manager, FTP, or GitHub deployment option.

After upload, open the free subdomain. The Angular app and API should run from the same link.

API test:

```text
https://your-site.runasp.net/api/Class
```
