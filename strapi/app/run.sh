#!/usr/bin/env bash
# yarn build

# just load initial config
# node check-data.js

# sleep 200000

if [[ 'production' == ${NODE_ENV} ]]; then
  yarn start
else
  yarn develop
fi
