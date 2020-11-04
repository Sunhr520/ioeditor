@echo off
title Java - Running

:comp
cd /d %3
javac %1 || goto end
echo -------------------------------------------------
java %4
echo.
echo.
echo Program exited with status %errorlevel%.

:end
echo Press any key to exit...
pause>nul
exit

