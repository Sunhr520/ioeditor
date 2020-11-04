@echo off
title C - Running

:comp
rem compile
%~dp0..src\environments\mingw64\bin\gcc.exe %1 -o %2.exe -std=c99 || goto end
rem runnig

echo -------------------------------------------------
%2.exe
echo.
echo.
echo Program exited with status %errorlevel%.
del %2.exe
:end
echo Press any key to exit...
pause>nul
exit

