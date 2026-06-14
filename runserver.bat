@echo off
chcp 65001 >nul
echo ========================================
echo Character Style Selector - Server
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Checking PHP environment...
if not exist "Lib\php.exe" (
    echo [ERROR] PHP not found in Lib folder.
    echo Please ensure php.exe exists in the Lib folder.
    pause
    exit /b 1
)
echo [OK] PHP environment check passed
echo.

echo [2/2] Starting PHP server...
echo ========================================
echo [INFO] Server is starting...
echo [INFO] Working directory: %cd%
echo [INFO] Access URL: http://localhost:8888
echo ========================================
echo.
echo [TIPS]:
echo    - Browser will open automatically
echo    - Press Ctrl+C to stop server
echo    - Closing this window will also stop server
echo ========================================
echo.

timeout /t 5 /nobreak >nul
start msedge http://localhost:8888

cd Lib
php.exe -S localhost:8888 -t ..

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server startup failed
    echo Please check:
    echo    1. Is php.exe in the Lib folder?
    echo    2. Is port 8888 occupied?
    echo    3. Do you have sufficient permissions?
    pause
)
