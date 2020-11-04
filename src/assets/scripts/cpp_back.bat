@echo off
title C++ - Running

:comp

%~dp0..\environments\mingw64\bin\g++ %1 -o %2 -std=c++11 -lm -Wall -g -static-libgcc -static-libstdc++ || goto end
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

