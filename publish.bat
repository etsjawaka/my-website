@echo off
REM Publish website changes to GitHub (Vercel then updates www.ione.no)
cd /d "%~dp0"
echo Getting latest from GitHub...
git pull --no-rebase
if errorlevel 1 (
  echo.
  echo Pull failed - copy this window's text to Claude.
  pause
  exit /b 1
)
git add -A
git commit -m "Website update"
echo Sending to GitHub...
git push
echo.
echo Done. The site updates in a minute or two.
pause
