#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'

generate_mock() {
  local min=4
  local max=""
  local file_name=""

  while (($# >= 1)); do
    case $1 in
    --min-length) min=$2 ;;
    --max-length) max=$2 ;;
    --name) file_name=$2 ;;
    esac
    shift
  done

  if [[ -z $file_name ]]; then
    echo -e "${RED}Missing --name argument${NOCOLOR}"
    exit 1
  fi

  jq --arg MIN_LENGTH "$min" --arg MAX_LENGTH "$max" --from-file "$JQ_SCRIPT" \
    "$MOCKS_DIR"/all-words-data.json | jq --compact-output '[keys[]]' \
    >"$MOCKS_DIR"/words/"$file_name".json

  echo -e "${GREEN}[words]: Generated $file_name.json!${NOCOLOR}"
}

echo

generate_mock --max-length 6 --name easy
generate_mock --min-length 7 --max-length 9 --name normal
generate_mock --min-length 10 --max-length 12 --name extreme
generate_mock --min-length 13 --name why
