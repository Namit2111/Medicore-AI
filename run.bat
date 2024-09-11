@echo off
cd frontend
call npm i
if %ERRORLEVEL% neq 0 goto :error
call npm run build
if %ERRORLEVEL% neq 0 goto :error
cd ..
cd backend
python app.py
goto :EOF

:error
echo An error occurred
pause
exit /b %ERRORLEVEL%