@echo off
echo ===================================================
echo Starting Maharshi Dayanand Jan Kalyan Sanstha NGO Website
echo ===================================================

echo Cleaning up existing processes on ports 5000 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo Terminating process %%a on port 5000...
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Terminating process %%a on port 5173...
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo [1/2] Starting Node.js Backend Server (Port 5000)...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting React Vite Frontend Server (Port 5173)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ===================================================
echo Both servers have been launched in separate windows!
echo Frontend will be available at: http://localhost:5173
echo Backend API is running on: http://localhost:5000
echo ===================================================
pause
