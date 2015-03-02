#!/usr/bin/env bash

#set -x

if [ $# -lt 1 ]; then
    echo "Invalid arguments: APPNAME"
    exit 1
fi

# Local configuration
source .env

# Ensure we don't deploy a version using local mock api
export USE_USERAPP_MOCK_API="false"

# General
APPNAME=$1
BUILD_CMD="grunt build-production --mixpanelId=$MIXPANEL_PROJECT_TOKEN"
API_BASE_URL="http://$APPNAME.$TLD/api/v1"

if [[ "$APPNAME" == "master" ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET"
else
    DEPLOYMENT_DIR="s3://$S3_BUCKET/stage/$BRANCH_NAME"
    ASSET_URL="http://$S3_BUCKET/stage/$BRANCH_NAME/"
fi

# =================================================
# BUILD APPLICATION

if [ ! -z $API_BASE_URL_OVERRIDE ]; then
    $BUILD_CMD --api=$API_BASE_URL_OVERRIDE --assetUrl=$ASSET_URL
else
    $BUILD_CMD --assetUrl=$ASSET_URL
fi

#karma start || { echo "Deployment failed: all tests must pass."; exit 1; }

# =================================================
# DEPLOY TO S3

# Generate S3 configuration file
echo "[default]
access_key = $S3_ACCESS_KEY
secret_key = $S3_SECRET
acl_public = True" > /tmp/.$S3_BUCKET-s3.s3cfg

# Export target
export PAGES_S3_TARGET=$DEPLOYMENT_DIR

# Run erb to generate the published config file
erb dist/scripts/env.js.erb > dist/scripts/env.js
rm dist/scripts/env.js.erb

# Upload to S3
s3cmd -v --config=/tmp/.$S3_BUCKET-s3.s3cfg --acl-public --recursive sync dist/ "$PAGES_S3_TARGET/"
