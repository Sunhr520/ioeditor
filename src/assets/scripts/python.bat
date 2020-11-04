@echo off
title Python - Running

:comp
echo -------------------------------------------------
%~dp0..\environments\python38-32\python %1
echo.
echo.
echo Program exited with status %errorlevel%.

:end
echo Press any key to exit...
pause>nul
exit

