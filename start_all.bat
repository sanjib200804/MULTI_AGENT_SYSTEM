@echo off
:: Prevents commands from being printed as they run
setlocal enabledelayedexpansion

:: Set window title and color
title Multi-Agent AI System Local Launcher
color 0B

cls
echo =======================================================================
echo    __  ___      _  __   _                  ___   ____
echo   /  ^|/  /_  __/ /_(_) /_  ___  ____ _    /   ^| /  _/
echo  / /^|_/ / / / / / __/ / / // _ \/ __ `/   / /^|_^| / /  
echo / /  / / /_/ / / /_/ / / //  __/ /_/ /   / ___ ^|/ /_  
echo/_/  /_/\__,_/_/\__/_/_/ /_/\___/\__,_/   /_/  ^|_/___/  
echo                                                               
echo         MULTI-AGENT SYSTEM LOCAL LAUNCHER (DEV MODE)
echo =======================================================================
echo.

:: Step 1: Check Docker environment (for Redis)
echo [1/3] Checking Docker environment (for Redis)...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Docker is not installed or not in your PATH.
    echo Redis is required to run the services. Please install Docker.
    goto ERROR_EXIT
)

docker info >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Docker Desktop is not running.
    echo Please start Docker Desktop and run this script again.
    goto ERROR_EXIT
)
echo [SUCCESS] Docker is running.
echo.

:: Step 2: Check PostgreSQL (expected local)
echo [2/3] Checking PostgreSQL port (5432) status...
netstat -ano | findstr /R "\<5432\>" | findstr /I "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] PostgreSQL does not seem to be listening on port 5432.
    echo Please ensure your local PostgreSQL database is running via pgAdmin/local service.
    echo.
    set /p "continue=Do you want to continue launching anyway? (y/n): "
    if /i "!continue!" neq "y" (
        goto ERROR_EXIT
    )
) else (
    echo [SUCCESS] PostgreSQL is listening on port 5432.
)
echo.

:: Step 3: Start Redis in Docker
echo [3/3] Starting Redis container 'agentra_redis' in Docker...
docker ps -a --format "{{.Names}}" | findstr /x "agentra_redis" >nul
if %errorlevel% equ 0 (
    echo Container 'agentra_redis' exists. Starting it...
    docker start agentra_redis >nul
) else (
    echo Container 'agentra_redis' does not exist. Creating and running it...
    docker run -d --name agentra_redis -p 6379:6379 redis:alpine >nul
)

:: Verify Redis is running
docker ps --filter "name=agentra_redis" --filter "status=running" --format "{{.Names}}" | findstr /x "agentra_redis" >nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Failed to start Redis in Docker.
    goto ERROR_EXIT
)
echo [SUCCESS] Redis is running in Docker on port 6379.
echo.

:: Step 4: Check if frontend node_modules is installed
if not exist "%~dp0frontend\node_modules\" (
    echo [WARNING] node_modules not found in frontend directory.
    set /p "install_npm=Would you like to run 'npm install' in the frontend first? (y/n): "
    if /i "!install_npm!"=="y" (
        echo Running npm install in frontend...
        cd /d "%~dp0frontend" && npm install
        cd /d "%~dp0"
    )
)
echo.

:: Step 5: Check and activate virtual environment if it exists
set "VENV_CMD="
if exist "%~dp0venv\Scripts\activate.bat" (
    set "VENV_CMD=call "%~dp0venv\Scripts\activate.bat""
) else if exist "%~dp0.venv\Scripts\activate.bat" (
    set "VENV_CMD=call "%~dp0.venv\Scripts\activate.bat""
) else if exist "%~dp0backend\venv\Scripts\activate.bat" (
    set "VENV_CMD=call "%~dp0backend\venv\Scripts\activate.bat""
) else if exist "%~dp0backend\.venv\Scripts\activate.bat" (
    set "VENV_CMD=call "%~dp0backend\.venv\Scripts\activate.bat""
)

if defined VENV_CMD (
    echo [INFO] Found virtual environment. It will be activated for backend services.
) else (
    echo [INFO] No virtual environment found. Running with global python/uvicorn.
)
echo.

:: Step 6: Launch all backend services and frontend in separate command windows
echo Launching services...
set "REDIS_URL_ENV=set REDIS_URL=redis://localhost:6379"

:: 1. Auth Service (Port 8001)
if defined VENV_CMD (
    start "Agentra - Auth Service" cmd /k "title Auth Service && cd /d "%~dp0backend\services\auth" && %VENV_CMD% && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8001"
) else (
    start "Agentra - Auth Service" cmd /k "title Auth Service && cd /d "%~dp0backend\services\auth" && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8001"
)

:: 2. Chat Service (Port 8002)
if defined VENV_CMD (
    start "Agentra - Chat Service" cmd /k "title Chat Service && cd /d "%~dp0backend\services\chat" && %VENV_CMD% && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8002"
) else (
    start "Agentra - Chat Service" cmd /k "title Chat Service && cd /d "%~dp0backend\services\chat" && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8002"
)

:: 3. Agent Service (Port 8003)
if defined VENV_CMD (
    start "Agentra - Agent Service" cmd /k "title Agent Service && cd /d "%~dp0backend\services\agent" && %VENV_CMD% && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8003"
) else (
    start "Agentra - Agent Service" cmd /k "title Agent Service && cd /d "%~dp0backend\services\agent" && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8003"
)

:: 4. Gateway Service (Port 8000)
if defined VENV_CMD (
    start "Agentra - Gateway Service" cmd /k "title Gateway Service && cd /d "%~dp0backend\getaway" && %VENV_CMD% && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8000"
) else (
    start "Agentra - Gateway Service" cmd /k "title Gateway Service && cd /d "%~dp0backend\getaway" && %REDIS_URL_ENV% && uvicorn app.main:app --host 127.0.0.1 --port 8000"
)

:: 5. Frontend Service
start "Agentra - Frontend" cmd /k "title Frontend Service && cd /d "%~dp0frontend" && npm run dev"

echo.
echo =======================================================================
echo All services have been launched in separate windows:
echo   - Gateway Service: http://localhost:8000
echo   - Auth Service:    http://localhost:8001
echo   - Chat Service:    http://localhost:8002
echo   - Agent Service:   http://localhost:8003
echo   - Frontend:        http://localhost:5173 (or default Vite port)
echo   - Redis (Docker):   localhost:6379
echo   - Postgres (Local): localhost:5432
echo =======================================================================
echo.
echo Keep this window open if you wish, or press any key to close the launcher.
pause >nul
exit /b 0

:ERROR_EXIT
echo.
echo Launch failed. Press any key to exit...
pause >nul
exit /b 1
