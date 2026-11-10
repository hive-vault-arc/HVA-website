@echo off
cd /d "%~dp0"
title HVA local preview - localhost:3000
echo Preparing the local HVA export...
node scripts\prepare_export.cjs
if errorlevel 1 (
  pause
  exit /b 1
)
echo Open http://localhost:3000 in your browser.
echo Keep this window open while previewing. Press Ctrl+C to stop.
python preview_server.py
pause
