#!/bin/bash
set -e
set -x

# If branch was inputted as argument, check it is checked out
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ ! -z "$1" ] && [ $1 != $CURRENT_BRANCH ]; then
    echo "ERROR: We cannot deploy branch $1 because the branch $CURRENT_BRANCH is checked out"
    exit 1
fi

# Install dependencies
# TODO: move to yarn v2 and zero-installs https://yarnpkg.com/features/zero-installs
yarn install --frozen-lockfile

# Bundle js, this takes 1-2 minutes
yarn build

# Copy the output into the app directory and delete old files
rm -r /var/www/app/*
cp -T -r ./dist /var/www/app
