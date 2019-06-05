#!/bin/bash
CONFIG=functions/src/configs/configs.prod.ts
DB=stravafordogs
FUNCTION_CONFIG=functions/src/config.ts
FRONTEND_CONFIG=src/globalConfig.ts

echo "Select $DB for firebase"
firebase use $DB

echo "copy $CONFIG to $FUNCTION_CONFIG"
# copy config
cp $CONFIG $FUNCTION_CONFIG
echo "copy $CONFIG to $FRONTEND_CONFIG"
cp $CONFIG $FRONTEND_CONFIG

echo "build the front end"
npm run build

echo "deploying.... 🕺🔥"
firebase deploy

echo "done! ✅"
