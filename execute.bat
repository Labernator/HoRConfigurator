ECHO OFF
IF NOT EXIST %~dp0\node_modules (
    ECHO Start node package installation
    call npm install
)
ECHO Open default browser and run app on port 3000
npm run start
PAUSE