#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks

jq --arg MIN_LENGTH "4" --compact-output --from-file "$PROJECT_ROOT"/scripts/all-words.jq \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/all-words.json
