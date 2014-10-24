#!/usr/bin/env bash

# =================================================
# INSTALL s3cmd
# 1.1.0-beta3 (manual install: http://sourceforge.net/projects/s3tools/files/s3cmd/1.1.0-beta3/s3cmd-1.1.0-beta3.zip/download)

set -x
#wget -O- -q http://s3tools.org/repo/deb-all/stable/s3tools.key | sudo apt-key add -
#sudo wget -O/etc/apt/sources.list.d/s3tools.list http://s3tools.org/repo/deb-all/stable/s3tools.list
#sudo apt-get update && sudo apt-get install -y -q s3cmd

if [ $# -lt 7 ]; then
    echo "Invalid arguments: dest_folder, access_key, secret, baseRoute, api, html5Mode, GA"
    exit 1
fi

# =================================================
# BUILD PROJECT

grunt build-production --baseRoute=$4 --api=$5 --html5Mode=$6 --ga=$5

# =================================================
# DEPLOY TO S3

# OUR SECRET KEYS
# THIS IS SECRET AND SHOULD NOT BE IN THE SAME FILE OR IN THE REPO
export PUBLIC_FILE_UPLOADERS_ACCESS_KEY=$2
export PUBLIC_FILE_UPLOADERS_SECRET=$3
# END OF SECRET

# generate s3 configuration file
echo "[default]
access_key = $PUBLIC_FILE_UPLOADERS_ACCESS_KEY
secret_key = $PUBLIC_FILE_UPLOADERS_SECRET
acl_public = True" > /tmp/.gapminder-s3.s3cfg

# export gapminder-pages target
export PAGES_S3_TARGET="s3://static.gapminder.org/pages-desktop"

# send to s3
s3cmd -v --config=/tmp/.gapminder-s3.s3cfg --acl-public --recursive put dist/ "$PAGES_S3_TARGET/"

# =================================================
