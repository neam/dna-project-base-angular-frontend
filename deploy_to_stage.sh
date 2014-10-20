#!/usr/bin/env bash

if [ $# -eq 0 ]; then
    param=""
else
    param=$1
fi

grunt build-stage $param && rsync -r dist root@cmsext.gapminderdev.org:/src/gapminder-pages-desktop
