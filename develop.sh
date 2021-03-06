#!/usr/bin/env bash

if [ $# -lt 1 ]; then
    echo "Missing first argument (APPVHOST)"
    echo "If we don't send APPVHOST we have no means of connecting with the rest api"
    exit 1
fi

#set -x

# fail on any error
set -o errexit

# Increase ulimit
ulimit -n 10000

# General
APPVHOST=$1

# Local configuration
source ../angular-frontend-dna/.config

# Offline mode switch
if [ "$2" == "offline" ]; then
  export OFFLINE_DEV="true"
fi

# Local api base url
export LOCAL_API_BASE_URL="//$APPVHOST/api"

# Inform env that this is a DEV run
export DEV="1"

# Run erb to generate the published config file
erb app/scripts/env.js.erb > app/scripts/env.js

# Run grunt development server task
npm run dev
