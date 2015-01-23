#!/usr/bin/env bash

#set -x

# Local configuration
source .env

# Run erb to generate the published config file
erb fork-src/js/env.js.erb > fork-src/js/env.js

# Run default grunt task
grunt