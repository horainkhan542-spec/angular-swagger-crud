FROM node:22-alpine AS frontend-build
WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY angular.json tsconfig*.json ./
COPY public ./public
COPY src ./src
RUN npm run build -- --configuration production

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

COPY BrightFutureSchoolApi/BrightFutureSchoolApi.csproj BrightFutureSchoolApi/
RUN dotnet restore BrightFutureSchoolApi/BrightFutureSchoolApi.csproj

COPY BrightFutureSchoolApi ./BrightFutureSchoolApi
COPY --from=frontend-build /src/dist/BrightFutureSchoolAngular/browser ./BrightFutureSchoolApi/wwwroot
RUN dotnet publish BrightFutureSchoolApi/BrightFutureSchoolApi.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

COPY --from=backend-build /app/publish .
ENTRYPOINT ["dotnet", "BrightFutureSchoolApi.dll"]
