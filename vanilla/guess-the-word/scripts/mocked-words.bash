#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq

jq --arg MIN_LENGTH "4" --arg MAX_LENGTH "9" --compact-output --from-file "$JQ_SCRIPT" \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/words/normal.json

jq --arg MIN_LENGTH "10" --arg MAX_LENGTH "" --compact-output --from-file "$JQ_SCRIPT" \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/words/extreme.json
