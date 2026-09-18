@echo off
setlocal enabledelayedexpansion

title Agentra Multi-Agent AI System Launcher
color 0B
cls

echo =======================================================================
echo    __  ___      _  __   _                  ___   ____
echo   /  ^|/  /_  __/ /_(_) /_  ___  ____ _    /   ^| /  _/
echo  / /^|_/ / / / / / __/ / / // _ \/ __ `/   / /^|_^| / /  
echo / /  / / /_/ / / /_/ / / //  __/ /_/ /   / ___ ^|/ /_  
echo/_/  /_/\__,_/_/\__/_/_/ /_/\___/\__,_/   /_/  ^|_/___/  
echo                                                               
echo         AGENTRA MULTI-AGENT SYSTEM LOCAL LAUNCHER
echo =======================================================================
echo.

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"
set "PYTHONPATH=%ROOT_DIR%\backend;%PYTHONPATH%"

:: Detect Docker executable path
set "DOCKER_CMD=docker"
where docker >nul 2>&1
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\DockerDesktop\resources\bin\docker.exe" (
        set "DOCKER_CMD="%LOCALAPPDATA%\Programs\DockerDesktop\resources\bin\docker.exe""
    ) else if exist "C:\Users\sanji\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe" (
        set "DOCKER_CMD="C:\Users\sanji\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe""
    ) else if exist "%ProgramFiles%\Docker\Docker\resources\bin\docker.exe" (
        set "DOCKER_CMD="%ProgramFiles%\Docker\Docker\resources\bin\docker.exe""
    )
)

:: -------------------------------------------------------------------------
:: Step 1: Redis Check & Auto-Start
:: -------------------------------------------------------------------------
echo [1/4] Checking Redis service status (port 6379)...
netstat -ano | findstr :6379 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Redis is already active and listening on port 6379.
) else (
    echo Redis is not active on port 6379. Checking Docker...
    !DOCKER_CMD! --version >nul 2>&1
    if !errorlevel! equ 0 (
        !DOCKER_CMD! info >nul 2>&1
        if !errorlevel! equ 0 (
            !DOCKER_CMD! ps -a --format "{{.Names}}" | findstr /x "agentra_redis" >nul 2>&1
            if !errorlevel! equ 0 (
                echo Starting existing 'agentra_redis' container...
                !DOCKER_CMD! start agentra_redis >nul 2>&1
            ) else (
                echo Creating and starting 'agentra_redis' container...
                !DOCKER_CMD! run -d --name agentra_redis -p 6379:6379 redis:alpine >nul 2>&1
            )
            ping 127.0.0.1 -n 3 >nul
            netstat -ano | findstr :6379 | findstr LISTENING >nul 2>&1
            if !errorlevel! equ 0 (
                echo [SUCCESS] Redis container successfully started in Docker on port 6379.
            ) else (
                echo [WARNING] Redis container started, but port 6379 is not yet detected. Proceeding...
            )
        ) else (
            echo [WARNING] Docker Desktop is installed but not running.
            echo If your services use local/cloud Redis, they will still attempt to connect.
        )
    ) else (
        echo [WARNING] Docker is not detected in PATH.
        echo If you have native Redis installed, please ensure it is running on port 6379.
    )
)
echo.

:: -------------------------------------------------------------------------
:: Step 2: PostgreSQL Port Check (port 5432)
:: -------------------------------------------------------------------------
echo [2/4] Checking PostgreSQL status (port 5432)...
netstat -ano | findstr :5432 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] PostgreSQL is active and listening on port 5432.
) else (
    echo [WARNING] PostgreSQL does not seem to be listening on port 5432.
    echo Make sure your local PostgreSQL database service Agentra_db is running.
)
echo.

:: -------------------------------------------------------------------------
:: Step 3: Frontend Dependencies Check
:: -------------------------------------------------------------------------
echo [3/4] Checking Frontend dependencies...
if not exist "%ROOT_DIR%\frontend\node_modules\" (
    echo [INFO] Installing frontend dependencies: npm install...
    cd /d "%ROOT_DIR%\frontend"
    call npm install
    cd /d "%ROOT_DIR%"
) else (
    echo [SUCCESS] Frontend dependencies are installed.
)
echo.

:: -------------------------------------------------------------------------
:: Step 4: Python & Virtual Environment Detection
:: -------------------------------------------------------------------------
echo [4/4] Detecting Python environment...
set "VENV_ACTIVATE="
if exist "%ROOT_DIR%\venv\Scripts\activate.bat" (
    set "VENV_ACTIVATE=call "%ROOT_DIR%\venv\Scripts\activate.bat""
) else if exist "%ROOT_DIR%\.venv\Scripts\activate.bat" (
    set "VENV_ACTIVATE=call "%ROOT_DIR%\.venv\Scripts\activate.bat""
) else if exist "%ROOT_DIR%\backend\venv\Scripts\activate.bat" (
    set "VENV_ACTIVATE=call "%ROOT_DIR%\backend\venv\Scripts\activate.bat""
) else if exist "%ROOT_DIR%\backend\.venv\Scripts\activate.bat" (
    set "VENV_ACTIVATE=call "%ROOT_DIR%\backend\.venv\Scripts\activate.bat""
)

if defined VENV_ACTIVATE (
    echo [INFO] Activating virtual environment...
) else (
    echo [INFO] Using global Python interpreter.
)

python --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Python is not installed or not in your PATH.
    goto ERROR_EXIT
)
echo.

:: Clean up any stale processes on ports 8000, 8001, 8002, 8003 before launching
echo Freeing backend microservice ports (8000, 8001, 8002, 8003)...
python -c "import subprocess; [subprocess.run(['taskkill', '/F', '/PID', l.split()[-1]], capture_output=True) for p in [8000, 8001, 8002, 8003] for l in subprocess.run(['netstat', '-ano'], capture_output=True, text=True).stdout.splitlines() if f':{p} ' in l and 'LISTENING' in l]" >nul 2>&1
ping 127.0.0.1 -n 2 >nul

:: -------------------------------------------------------------------------
:: Launch Microservices & Frontend
:: -------------------------------------------------------------------------
echo =======================================================================
echo Launching all Agentra services in separate windows...
echo =======================================================================

set "ENV_SETUP=set PYTHONPATH=%ROOT_DIR%\backend"
if defined VENV_ACTIVATE (
    set "INIT_CMD=%VENV_ACTIVATE% && %ENV_SETUP%"
) else (
    set "INIT_CMD=%ENV_SETUP%"
)

:: 1. Auth Service (Port 8001)
start "Agentra - Auth Service (8001)" cmd /k "title Agentra - Auth Service (8001) && cd /d "%ROOT_DIR%\backend\services\auth" && %INIT_CMD% && python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload"

:: 2. Chat Service (Port 8002)
start "Agentra - Chat Service (8002)" cmd /k "title Agentra - Chat Service (8002) && cd /d "%ROOT_DIR%\backend\services\chat" && %INIT_CMD% && python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload"

:: 3. Agent Service (Port 8003)
start "Agentra - Agent Service (8003)" cmd /k "title Agentra - Agent Service (8003) && cd /d "%ROOT_DIR%\backend\services\agent" && %INIT_CMD% && python -m uvicorn app.main:app --host 127.0.0.1 --port 8003 --reload"

:: 4. API Gateway Service (Port 8000)
start "Agentra - Gateway Service (8000)" cmd /k "title Agentra - Gateway Service (8000) && cd /d "%ROOT_DIR%\backend\getaway" && %INIT_CMD% && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

:: 5. Frontend Service (Vite)
netstat -ano | findstr :5173 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Frontend is already running on http://localhost:5173.
) else (
    start "Agentra - Frontend UI (5173)" cmd /k "title Agentra - Frontend UI && cd /d "%ROOT_DIR%\frontend" && npm run dev"
)

echo.
echo =======================================================================
echo [SUCCESS] All Agentra services dispatched!
echo.
echo   - Web Application: http://localhost:5173
echo   - API Gateway:     http://localhost:8000  (Docs: http://localhost:8000/docs)
echo   - Auth Service:    http://localhost:8001  (Docs: http://localhost:8001/docs)
echo   - Chat Service:    http://localhost:8002  (Docs: http://localhost:8002/docs)
echo   - Agent Service:   http://localhost:8003  (Docs: http://localhost:8003/docs)
echo   - Redis:           localhost:6379
echo   - PostgreSQL:      localhost:5432
echo =======================================================================
echo.
echo Keep the individual service windows open while developing.
echo You may close this launcher window at any time.
pause
exit /b 0

:ERROR_EXIT
echo.
echo [FAIL] Startup aborted. Press any key to exit...
pause >nul
exit /b 1
