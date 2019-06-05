#!/bin/bash
# Bash Menu Script Example
FILE=./src/config.ts
CONFIG=./src/configs/config.dev.ts

while true; do
    read -p "Is this a production build?" yn
    case $yn in
        [Yy]* ) CONFIG=./src/configs/config.prod.ts; break;;
        [Nn]* ) CONFIG=./src/configs/config.dev.ts; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

# remove old (if)
if test -f "$FILE"; then
    rm $FILE
fi

# copy config
cp $CONFIG $FILE

