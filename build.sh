#!/bin/bash

filename="jquery.countdown"
minified_filename="jquery.countdown.min"

# get the first line of CHANGELOG
line=$(head -n 1 CHANGELOG)
# echo $line

# get the version from CHANGELOG
version=${line:1:5}

# get the date from CHANGELOG
date=${line:8:10}
date=$(echo $date | sed 's/\//-/g')

echo "Building release v$version, on $date"

# copy uncompressed script to build
cp "src/$filename.js" "build/$filename.js"

# change VERSION and DATE
sed -i "s/VERSION/$version/" "build/$filename.js"
sed -i -e "s/DATE/$date/" "build/$filename.js"

# compress the script
yui-compressor --type js -o "build/$minified_filename.js" "build/$filename.js"

# add comment to the minified version
head -22 "build/$filename.js" | cat - "build/$filename.js" > "build/temp" && mv "build/temp" "build/$minified_filename.js"

# check if has been committed
# commit=$(git status -sb -uno)
# # commit=${commit:10:2}

# words=( $commit )
# len="${#words[@]}"
# echo "words counted: $len"

# printf "%s\n" "${words[@]}" ## print array

# check if has been tagged
tags=$(git tag)
tagged=0
for tag in $tags
do
  if [[ "v$version" == $tag ]]; then
    tagged=1
  fi
done
if [[ $tagged -eq 0 ]]; then
  echo "tag does not exists, creating..."
  git tag "v$version"
fi
