#!/usr/bin/env bash

#set -x

# Local configuration
source .env

# Run erb to generate the published config file
erb app/scripts/env.js.erb > app/scripts/env.js

# Run grunt development server task
grunt live