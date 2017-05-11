@echo off

setlocal
SET PATH=%~dp0tools\node\7.9.0;%~dp0tools\7zip;%PATH%

IF NOT EXIST %~dp0tools\node\7.9.0\node.exe (
	echo Node not unpacked, unpacking..
	call 7za x %~dp0tools\node\7.9.0\node.7z -o%~dp0tools\node\7.9.0\ -y
)

call npm install
if errorlevel 1 (
    echo Failed installing npm packages: %errorlevel%
    exit /b %errorlevel%
)

if [%1]==[] (
    echo ---------------
    echo Available choices:
		echo cli client:serve - starts up clientside version with webpack hot reload
		echo cli server:serve - starts up server version with nodemon and livereload
    echo cli package - builds deploy package
) else (
    node --harmony node_modules\gulp\bin\gulp.js %*
)
