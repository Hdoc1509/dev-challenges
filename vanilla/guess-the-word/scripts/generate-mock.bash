#!/bin/bash

min=4
max=""
file_name=""

while (($# >= 1)); do
  case $1 in
  --min-length) min=$2 ;;
  --max-length) max=$2 ;;
  --name) file_name=$2 ;;
  esac
  shift
done

MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq

if [[ -z $file_name ]]; then
  echo "Missing --name argument"
  exit 1
fi

jq --arg MIN_LENGTH "$min" --arg MAX_LENGTH "$max" --compact-output --from-file "$JQ_SCRIPT" \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/words/"$file_name".json
