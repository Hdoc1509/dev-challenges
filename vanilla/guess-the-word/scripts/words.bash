#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq

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
    echo "Missing --name argument"
    exit 1
  fi

  jq --arg MIN_LENGTH "$min" --arg MAX_LENGTH "$max" --from-file "$JQ_SCRIPT" \
    "$MOCKS_DIR"/wordsapi_sample.json | jq --compact-output '[keys[]]' \
    >"$MOCKS_DIR"/words/"$file_name".json
}

generate_mock --max-length 6 --name easy
generate_mock --min-length 7 --max-length 9 --name normal
generate_mock --min-length 10 --name extreme
