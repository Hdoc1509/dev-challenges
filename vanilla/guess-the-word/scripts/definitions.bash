#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_FILTER_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq
JQ_PARSE_SCRIPT="$PROJECT_ROOT"/scripts/parse-definitions.jq

jq --arg MIN_LENGTH "4" --arg MAX_LENGTH "" --from-file "$JQ_FILTER_SCRIPT" \
  "$MOCKS_DIR"/all-words-data.json |
  jq --compact-output --from-file "$JQ_PARSE_SCRIPT" \
  >"$MOCKS_DIR"/definitions.json
