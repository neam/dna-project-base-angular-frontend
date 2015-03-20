#!/usr/bin/env bash

#set -x

if [ $# -lt 1 ]; then
    echo "Invalid arguments: APPNAME"
    exit 1
fi

# Local configuration
source .env

# General
APPNAME=$1

if [[ "$APPNAME" == "master" ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET"
else
    DEPLOYMENT_DIR="s3://$S3_BUCKET/stage/$BRANCH_NAME"
    #ASSET_URL="http://$S3_BUCKET/stage/$BRANCH_NAME/"
fi

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
#s3cmd -v --config=/tmp/.$S3_BUCKET-s3.s3cfg --acl-public --recursive sync dist/ "$PAGES_S3_TARGET/"
