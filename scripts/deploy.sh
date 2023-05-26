#!/bin/bash
set -e
set -x

# Pull latest code
git pull

# Bundle js, this takes 1-2 minutes
yarn build

# Copy the output into the app directory and delete old files
rm -r /var/www/app/*
cp -T -r ./dist /var/www/app
