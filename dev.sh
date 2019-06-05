#!/bin/bash
# Bash Menu Script Example
FUNCTION_CONFIG=functions/src/config.ts
FRONTEND_CONFIG=src/globalConfig.ts


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

