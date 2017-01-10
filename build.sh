#!/usr/bin/env bash

#set -x

# fail on any error
set -o errexit

# Local configuration
source ../angular-frontend-dna/.config

# =================================================
# Set app config

# Arguments
APPVHOST=$1

# Ensure we don't build a version using local mock api
export OFFLINE_DEV="false"

# Local api base url
if [ "$APPVHOST" == "" ]; then
    # If we don't send APPVHOST, it means that we are bundling the frontend with the api, and we should use a relative url instead
    export LOCAL_API_BASE_URL="/api"
else
    export LOCAL_API_BASE_URL="//$APPVHOST/api"
fi

# Run erb to generate the published config file
erb app/scripts/env.js.erb > app/scripts/env.js

# =================================================
# BUILD APPLICATION

npm run build

if [ "$CI" == "1" ]; then
    echo "Not starting HTTP Server since in CI mode"
else
    npm start
fi

# =================================================
# Test app

#karma start || { echo "Deployment failed: all tests must pass."; exit 1; }
