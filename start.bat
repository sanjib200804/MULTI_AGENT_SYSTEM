@echo off
:: Prevents commands from being printed as they run
setlocal enabledelayedexpansion

:: Set window title and color
title Multi-Agent AI System Launcher
color 0B

cls
echo =======================================================================
echo    __  ___      _  __   _                  ___   ____
echo   /  ^|/  /_  __/ /_(_) /_  ___  ____ _    /   ^| /  _/
echo  / /^|_/ / / / / / __/ / / // _ \/ __ `/   / /^|_^| / /  
echo / /  / / /_/ / / /_/ / / //  __/ /_/ /   / ___ ^|/ /_  
echo/_/  /_/\__,_/_/\__/_/_/ /_/\___/\__,_/   /_/  ^|_/___/  
echo                                                               
echo            MULTI-AGENT SYSTEM LAUNCHER
echo =======================================================================
echo.

:: Step 1: Check Docker installation and daemon status
echo [1/2] Checking Docker environment...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Docker is not installed or not in your PATH.
    echo Please install Docker Desktop from https://www.docker.com/
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

:: Step 2: Check for root .env file and warn if missing
if not exist ".env" (
    echo [WARNING] No root .env file found in this directory.
    echo Services that require external API keys (such as GROQ_API_KEY, GOOGLE_API_KEY)
    echo might fail or run with empty credentials if not configured.
    echo You can configure them in a root .env file.
    echo.
    echo Continuing launch in 3 seconds...
    timeout /t 3 >nul
)

:: Step 3: Run Docker Compose
echo [2/2] Starting all services via Docker Compose...
echo.
docker compose up --build
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Docker Compose failed to start the services.
    goto ERROR_EXIT
)

goto EXIT

:ERROR_EXIT
echo.
echo Press any key to exit...
pause >nul
exit /b 1

:EXIT
echo.
echo Services stopped successfully.
pause
