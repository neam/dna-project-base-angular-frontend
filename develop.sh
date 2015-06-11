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

# Api base url
export API_BASE_URL="//$APPVHOST/api"

# Run erb to generate the published config file
erb app/scripts/env.js.erb > app/scripts/env.js

# Run grunt development server task
grunt live
