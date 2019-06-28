#!/bin/bash

# Add the absoulute path to your dev/prod service account json files
# make sure they are named `stravafordogs` || `stravafordogsdev` .json
CREDS_PATH="/Users/eric/Documents/Dev/Google"


FUNCTION_CONFIG=functions/src/config.ts
FRONTEND_CONFIG=src/globalConfig.ts


export GOOGLE_APPLICATION_CREDENTIALS=$CREDS

while true; do
    read -p "Is this a PRODUCTION build?" yn
    case $yn in
        [Yy]* ) DB=stravafordogs; CONFIG=functions/src/configs/configs.prod.ts; break;;
        [Nn]* ) DB=stravafordogsdev; CONFIG=functions/src/configs/configs.dev.ts; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

# remove old (if)
if test -f "$FUNCTION_CONFIG"; then
    rm $FUNCTION_CONFIG
fi

if test -f "$FRONTEND_CONFIG"; then
    rm $FRONTEND_CONFIG
fi

firebase use $DB

# copy config
cp $CONFIG $FUNCTION_CONFIG
cp $CONFIG $FRONTEND_CONFIG

# admin creds - assumes the CREDS_PATH has prod and dev service account json
ADMIN_CRED_PATH=functions/src/serviceAccount.ts
echo "module.exports =  " > $ADMIN_CRED_PATH
cat "$CREDS_PATH/$DB.json" >> $ADMIN_CRED_PATH
export GOOGLE_APPLICATION_CREDENTIALS="$CREDS_PATH/$DB.json"
echo $GOOGLE_APPLICATION_CREDENTIALS

echo "cloud functions config reads:"
cat $FUNCTION_CONFIG

echo "frontend config reads:"
cat $FRONTEND_CONFIG

echo $CREDS