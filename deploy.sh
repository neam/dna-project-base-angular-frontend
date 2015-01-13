#!/usr/bin/env bash

#set -x

if [ $# -lt 3 ]; then
    echo "Invalid arguments: ENVIRONMENT, S3_ACCESS_KEY, S3_SECRET"
    exit 1
fi

# Variables
ENVIRONMENT=$1
S3_ACCESS_KEY=$2
S3_SECRET=$3
API_BASE_URL_OVERRIDE=$4
BRANCH_NAME=$4

if [[ "$ENVIRONMENT" == "stage" ]]; then
    DEPLOYMENT_DIR="s3://static.gapminder.org/pages-desktop-stage"
    BUILD_CMD="grunt build-stage"
elif [[ "$ENVIRONMENT" == "stage-mock" ]]; then
    DEPLOYMENT_DIR="s3://static.gapminder.org/pages-desktop-stage-with-mock"
    BUILD_CMD="grunt build-stage --assetUrl=http://static.gapminder.org/pages-desktop-stage-with-mock/ --api=http://cmsextmock.gapminderdev.org:1338/api"
elif [[ "$ENVIRONMENT" == "production" ]]; then
    DEPLOYMENT_DIR="s3://static.gapminder.org/pages-desktop/master"
    BUILD_CMD="grunt build-production"
elif [[ "$ENVIRONMENT" == "branch" ]]; then
    if [ -z "$BRANCH_NAME" ]; then
        BRANCH_NAME="release_pages-dec-1-2014" # default branch name
    fi

    API_BASE_URL_OVERRIDE="" # do not override API URL
    DEPLOYMENT_DIR="s3://static.gapminder.org/pages-desktop/$BRANCH_NAME"
    BUILD_CMD="grunt build-production --assetUrl=http://static.gapminder.org/pages-desktop/$BRANCH_NAME/ --api=http://$BRANCH_NAME-cms.gapminderdev.org/api/v1"
else
    echo "Invalid environment. Please choose one of the following: stage, production, release"
    exit 1
fi

# =================================================
# BUILD APPLICATION

if [ ! -z $API_BASE_URL_OVERRIDE ]; then
    $BUILD_CMD --api=$API_BASE_URL_OVERRIDE
else
    $BUILD_CMD
fi

karma start || { echo "Deployment failed: all tests must pass."; exit 1; }

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
s3cmd -v --config=/tmp/.gapminder-s3.s3cfg --acl-public --recursive sync dist/ "$PAGES_S3_TARGET/"
