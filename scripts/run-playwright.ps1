$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$env:VITE_API_URL = "http://localhost:5000/api"
$env:PLAYWRIGHT_SKIP_WEBSERVER = "1"

$server = Start-Process `
  -FilePath "node" `
  -ArgumentList @("./node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "4173") `
  -WorkingDirectory $root `
  -PassThru `
  -WindowStyle Hidden

try {
  $ready = $false

  for ($i = 0; $i -lt 40; $i++) {
    try {
      Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:4173/login" | Out-Null
      $ready = $true
      break
    } catch {
      Start-Sleep -Milliseconds 500
    }
  }

  if (-not $ready) {
    throw "Vite dev server did not become ready on http://127.0.0.1:4173"
  }

  & npx.cmd playwright test
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
} finally {
  Remove-Item Env:\PLAYWRIGHT_SKIP_WEBSERVER -ErrorAction SilentlyContinue
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
}
