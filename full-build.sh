#!/usr/bin/env bash

# fail on any error
set -o errexit

# run from script path
cd $(dirname $0)

npm install
bower install --allow-root --config.interactive=false

export CI=1
./build.sh $@
