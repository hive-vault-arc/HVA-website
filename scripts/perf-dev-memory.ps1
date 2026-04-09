param(
  [string[]]$Routes = @('/', '/arc', '/capabilities', '/insights'),
  [int]$StartupDelaySeconds = 18,
  [int]$WarmupDelaySeconds = 8
)

$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$stdoutLog = Join-Path $env:TEMP 'hiva-perf-dev-stdout.log'
$stderrLog = Join-Path $env:TEMP 'hiva-perf-dev-stderr.log'

if (Test-Path $stdoutLog) { Remove-Item $stdoutLog -Force }
if (Test-Path $stderrLog) { Remove-Item $stderrLog -Force }

function Get-WorkspaceNodeProcesses {
  Get-CimInstance Win32_Process |
    Where-Object {
      $_.Name -match '^node(\.exe)?$' -and
      $_.CommandLine -like "*$workspace*"
    }
}

function Capture-Snapshot([string]$Stage) {
  $rows = @()
  $nodeProcs = Get-WorkspaceNodeProcesses
  foreach ($proc in $nodeProcs) {
    try {
      $running = Get-Process -Id $proc.ProcessId -ErrorAction Stop
      $rows += [pscustomobject]@{
        Stage        = $Stage
        PID          = $running.Id
        CPUSeconds   = [math]::Round($running.CPU, 2)
        WorkingSetMB = [math]::Round($running.WorkingSet64 / 1MB, 1)
        PrivateMB    = [math]::Round($running.PrivateMemorySize64 / 1MB, 1)
        CommandLine  = $proc.CommandLine
      }
    }
    catch {
      # Process may exit between CIM and Get-Process.
    }
  }
  return $rows
}

Write-Host "Starting dev server in: $workspace" -ForegroundColor Cyan
$dev = Start-Process -FilePath npm.cmd -ArgumentList 'run', 'dev' -WorkingDirectory $workspace -PassThru -RedirectStandardOutput $stdoutLog -RedirectStandardError $stderrLog

Start-Sleep -Seconds $StartupDelaySeconds
$idleSnapshot = Capture-Snapshot -Stage 'idle'

foreach ($route in $Routes) {
  $url = "http://localhost:3000$route"
  try {
    Invoke-WebRequest -Uri $url -UseBasicParsing | Out-Null
    Write-Host "Warmed: $url" -ForegroundColor DarkGray
  }
  catch {
    Write-Warning "Warmup request failed: $url"
  }
}

Start-Sleep -Seconds $WarmupDelaySeconds
$warmSnapshot = Capture-Snapshot -Stage 'warmed'

Write-Host "`nMemory/CPU snapshots (workspace-scoped node processes):" -ForegroundColor Green
($idleSnapshot + $warmSnapshot) |
  Sort-Object Stage, WorkingSetMB -Descending |
  Format-Table -AutoSize

Write-Host "`nDev stdout (tail):" -ForegroundColor Yellow
if (Test-Path $stdoutLog) {
  Get-Content -Path $stdoutLog -Tail 40
}

Write-Host "`nDev stderr (tail):" -ForegroundColor Yellow
if (Test-Path $stderrLog) {
  Get-Content -Path $stderrLog -Tail 40
}

Get-WorkspaceNodeProcesses | ForEach-Object {
  Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
}
