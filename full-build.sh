#!/usr/bin/env bash

# run from script path
cd $(dirname $0)

npm install
bower install --allow-root --config.interactive=false

export CI=1
./build.sh
