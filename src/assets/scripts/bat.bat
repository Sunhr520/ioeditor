@echo off
title Bat - Running

:comp
echo -------------------------------------------------
cd /d %3
%1
echo.
echo.
echo Program exited with status %errorlevel%.

:end
echo Press any key to exit...
pause>nul
exit

