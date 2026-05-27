@echo off
echo ===================================================
echo Pushing NGO Org Project to GitHub
echo ===================================================
echo.

REM Verify Git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Configure remote origin
echo Setting remote origin to https://github.com/anky1weo/ngo_org.git...
git remote set-url origin https://github.com/anky1weo/ngo_org.git 2>nul || git remote add origin https://github.com/anky1weo/ngo_org.git

REM Set local identity if not set globally
git config user.name "anky1weo"
git config user.email "anky1weo@users.noreply.github.com"

REM Add all files
echo Staging files...
git add .

REM Commit files
echo Committing files...
git commit -m "initial commit" 2>nul || echo No new changes to commit

REM Rename branch to main
git branch -M main

REM Push to main
echo.
echo ===================================================
echo Pushing to GitHub... (This will prompt for authentication)
echo ===================================================
git push -u origin main

echo.
echo ===================================================
echo Process finished. Please review the output above.
echo ===================================================
pause
