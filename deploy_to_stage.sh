#!/usr/bin/env bash

#set -x

# Variables
S3_ACCESS_KEY=$1
S3_SECRET=$2
API_BASE_URL_OVERRIDE=$3
DEPLOYMENT_DIR="s3://static.gapminder.org/pages-desktop-stage"

if [ $# -lt 2 ]; then
    echo "Invalid arguments: S3_ACCESS_KEY, S3_SECRET"
    exit 1
fi

# =================================================
# BUILD APPLICATION

karma start || { echo "Deployment failed: all tests must pass."; exit 1; }

if [ $# -eq 3 ]; then
    grunt build-stage --api=$API_BASE_URL_OVERRIDE
else
    grunt build-stage
fi

# =================================================
# DEPLOY TO S3

export PUBLIC_FILE_UPLOADERS_ACCESS_KEY=$S3_ACCESS_KEY
export PUBLIC_FILE_UPLOADERS_SECRET=$S3_SECRET

# Generate S3 configuration file
echo "[default]
access_key = $PUBLIC_FILE_UPLOADERS_ACCESS_KEY
secret_key = $PUBLIC_FILE_UPLOADERS_SECRET
acl_public = True" > /tmp/.gapminder-s3.s3cfg

# Export target
export PAGES_S3_TARGET=$DEPLOYMENT_DIR

# Upload to S3
s3cmd -v --config=/tmp/.gapminder-s3.s3cfg --acl-public --recursive put dist/ "$PAGES_S3_TARGET/"
