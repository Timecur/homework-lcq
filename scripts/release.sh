#!/usr/bin/env sh
set -e

git checkout master
git pull

CURTAGHASH=`git rev-list --tags --max-count=1`
CURVERSION=`git describe --tags $CURTAGHASH`
NEWVERSION=`node ./node_modules/.bin/version-select -c $CURVERSION`

read -p "Releasing $NEWVERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $NEWVERSION ..."

  # create tag
  git tag -a "release-$NEWVERSION" -m "[release] $NEWVERSION"

  # push
  git push origin "release-$NEWVERSION"
fi
