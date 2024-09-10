@echo off
chcp 65001 > nul

set "versionScript=v0.01"

REM Script Name   : MI IP básico (Total 2 opciones, no submenus, no enlaces externos)
REM Author        : Alplox https://github.com/Alplox
REM Created       : 06-01-2024
REM Version       : v0.01
REM Repository    : 
REM Description   : Batch simple para ver dirección IP equipo.

:inicio
cls
title MI IP (%versionScript%)
mode con: cols=85 lines=15
setlocal ENABLEEXTENSIONS & set "i=0.0.0.0" & set "j="
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0.*0.0.0.0') do (
  if not defined j for %%b in (%%a) do set "i=%%b" & set "j=1"
)
endlocal & set "dip=%i%"

echo _____________________________________________________________________________________
echo.
echo              Dirección IP = %dip%
REM Verificar el estado del servicio de Escritorio Remoto
::reg query "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections | find "fDenyTSConnections" > nul
::if errorlevel 1 (
::echo             Toma Remota habilitada
::) else (
::echo             Toma Remota deshabilitada
::)
echo _____________________________________________________________________________________
echo.
echo          __________________________________________
echo.
echo          [1] Abrir Asistencia Rápida (Toma remota alternativa / CTRL + Windows + Q)
echo          [2] Ejecutar el comando "ipconfig"
echo.
echo          [S] Salir
echo          __________________________________________
echo.   
echo. 
set /p opcionesInicio=Ingrese el [número/letra] de la opción deseada:
if %opcionesInicio%==1 (
  start %windir%\system32\quickassist.exe
  goto inicio
)
if %opcionesInicio%==2 goto ejecutar-ipconfig
if /i "%opcionesInicio%"=="S" goto fin
echo Opción inválida, intenta de nuevo.
goto inicio



:ejecutar-ipconfig
cls
mode con: cols=120 lines=35
title Resultado de comando "ipconfig"
ipconfig
goto volver-a-menu-inicio


:abrir-asistencia-rapida
start %windir%\system32\quickassist.exe
goto inicio


:volver-a-menu-inicio
echo.
echo __________________________________________________
echo.
echo Pulse cualquier tecla para regresar...
echo __________________________________________________
echo.
pause > nul
goto inicio

:fin