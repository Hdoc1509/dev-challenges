#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks

jq --arg MIN_LENGTH "10" --compact-output --from-file "$PROJECT_ROOT"/scripts/min-10-letters.jq \
  "$MOCKS_DIR"/wordsapi_sample.json \
  >"$MOCKS_DIR"/min-10-letters.json
