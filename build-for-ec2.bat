@echo off
REM Healthcare App - Build Script for EC2 Deployment (Windows)
REM This script prepares your app for deployment to EC2 via WinSCP

echo ========================================
echo  Building Healthcare App for EC2
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

echo [2/3] Building application...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

if not exist "out" (
    echo [ERROR] Build output directory 'out' not found
    pause
    exit /b 1
)
echo [OK] Build completed successfully
echo.

echo [3/3] Verifying build output...
dir /b out\index.html >nul 2>&1
if errorlevel 1 (
    echo [WARNING] index.html not found in out directory
) else (
    echo [OK] Build output verified
)
echo.

echo ========================================
echo  Build Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open WinSCP and connect to your EC2 instance
echo 2. Navigate to /var/www/healthcare-app on the server
echo 3. Upload the 'out' folder contents
echo 4. Also upload package.json and package-lock.json
echo.
echo For detailed instructions, see: EC2_DEPLOYMENT_GUIDE.md
echo.
pause

