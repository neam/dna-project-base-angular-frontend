#!/usr/bin/env bash

#set -x

if [ $# -lt 1 ]; then
    echo "Invalid arguments: APPNAME"
    exit 1
fi

# Local configuration
source .env

# Parameters
ENVIRONMENT=$1
API_BASE_URL_OVERRIDE=$2
BRANCH_NAME=$2

if [[ "$ENVIRONMENT" == "stage" ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET/pages-desktop-stage"
    ASSET_URL=""
    BUILD_CMD="grunt build-stage"
elif [[ "$ENVIRONMENT" == "stage-mock" ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET/pages-desktop-stage-with-mock"
    API_BASE_URL_OVERRIDE=$MOCK_API_BASE_URL # override API URL
    ASSET_URL="http://$S3_BUCKET/pages-desktop-stage-with-mock/"
    BUILD_CMD="grunt build-stage"
elif [[ "$ENVIRONMENT" == "production" ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET/pages-desktop/master"
    ASSET_URL=""
    BUILD_CMD="grunt build-production"
elif [[ "$ENVIRONMENT" == "branch" ]]; then
    if [ -z "$BRANCH_NAME" ]; then
        BRANCH_NAME="release_pages-dec-1-2014" # default branch name
    fi

    API_BASE_URL_OVERRIDE="http://$BRANCH_NAME-cms.gapminderdev.org/api/v1" # override API URL
    DEPLOYMENT_DIR="s3://$S3_BUCKET/pages-desktop/$BRANCH_NAME"
    ASSET_URL="http://$S3_BUCKET/pages-desktop/$BRANCH_NAME/"
    BUILD_CMD="grunt build-production"
else
    echo "Invalid environment. Please choose one of the following: stage, production, release"
    exit 1
fi

# =================================================
# BUILD APPLICATION

if [ ! -z $API_BASE_URL_OVERRIDE ]; then
    $BUILD_CMD --api=$API_BASE_URL_OVERRIDE --assetUrl=$ASSET_URL
else
    $BUILD_CMD --assetUrl=$ASSET_URL
fi

karma start || { echo "Deployment failed: all tests must pass."; exit 1; }

# =================================================
# DEPLOY TO S3

# Generate S3 configuration file
echo "[default]
access_key = $S3_ACCESS_KEY
secret_key = $S3_SECRET
acl_public = True" > /tmp/.$S3_BUCKET-s3.s3cfg

# Export target
export PAGES_S3_TARGET=$DEPLOYMENT_DIR

# Upload to S3
s3cmd -v --config=/tmp/.$S3_BUCKET-s3.s3cfg --acl-public --recursive sync dist/ "$PAGES_S3_TARGET/"
