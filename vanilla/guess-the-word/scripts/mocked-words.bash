#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq

jq --arg MIN_LENGTH "4" --compact-output --from-file "$JQ_SCRIPT" \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/all-words.json

jq --arg MIN_LENGTH "10" --compact-output --from-file "$JQ_SCRIPT" \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/min-10-letters.json
