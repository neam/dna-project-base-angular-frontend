#!/usr/bin/env bash

#set -x

if [ $# -lt 1 ]; then
    echo "Invalid arguments: DEPLOYMENT_TARGET missing"
    exit 1
fi

# fail on any error
set -o errexit

# Local configuration
source .deploy-secrets

# General
DEPLOYMENT_TARGET=$1

# Deploy to production/root by specifying "root", "prod" or "live" as deploy destination
if [[ "$DEPLOYMENT_TARGET" == root ]] || [[ "$DEPLOYMENT_TARGET" == prod ]] || [[ "$DEPLOYMENT_TARGET" == live ]]; then
    DEPLOYMENT_DIR="s3://$S3_BUCKET"
else
    DEPLOYMENT_DIR="s3://$DEPLOYMENT_TARGET.$S3_BUCKET"
    #ASSET_URL="http://$DEPLOYMENT_TARGET.$S3_BUCKET"
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
s3cmd -v --config=/tmp/.$S3_BUCKET-s3.s3cfg --acl-public --recursive sync dist/ "$PAGES_S3_TARGET/"

exit 0;
# Purge cloudflare cache
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/purge_cache" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
