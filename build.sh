#!/usr/bin/env bash

#set -x

if [ $# -lt 1 ]; then
    echo "Invalid arguments: Missing APPVHOST"
    exit 1
fi

# General
APPNAME=$1
BUILD_CMD="grunt build"

# =================================================
# BUILD APPLICATION

$BUILD_CMD

# =================================================
# Set app config

# Api base url
export API_BASE_URL="http://$APPVHOST/api/v1"

# Ensure we don't deploy a version using local mock api
export USE_USERAPP_MOCK_API="false"

# Run erb to generate the published config file
erb app/scripts/env.js.erb > dist/scripts/env.js

# =================================================
# Test app

#karma start || { echo "Deployment failed: all tests must pass."; exit 1; }
