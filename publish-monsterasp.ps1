$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendDist = Join-Path $root 'dist\BrightFutureSchoolAngular\browser'
$apiRoot = Join-Path $root 'BrightFutureSchoolApi'
$wwwroot = Join-Path $apiRoot 'wwwroot'
$publishDir = Join-Path $root 'publish\monsterasp'
$zipPath = Join-Path $root 'publish\monsterasp.zip'

Push-Location $root
try {
  npm run build -- --configuration production

  if (Test-Path $wwwroot) {
    Remove-Item $wwwroot -Recurse -Force
  }

  New-Item -ItemType Directory -Force -Path $wwwroot | Out-Null
  Copy-Item -Path (Join-Path $frontendDist '*') -Destination $wwwroot -Recurse -Force

  if (Test-Path $publishDir) {
    Remove-Item $publishDir -Recurse -Force
  }

  dotnet publish .\BrightFutureSchoolApi\BrightFutureSchoolApi.csproj -c Release -o $publishDir

  if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
  }

  Compress-Archive -Path (Join-Path $publishDir '*') -DestinationPath $zipPath -Force
  Write-Host "Created $zipPath"
}
finally {
  Pop-Location
}
