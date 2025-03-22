#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_FILTER_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq
JQ_PARSE_SCRIPT="$PROJECT_ROOT"/scripts/parse-definitions.jq

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

if git diff --quiet origin/master HEAD "$JQ_FILTER_SCRIPT" &&
  git diff --quiet "$JQ_FILTER_SCRIPT"; then
  echo
  echo -e "${YELLOW}[defs]: Filter script is up to date"
  echo -e "[defs]: Skipping generation...${NOCOLOR}"
  exit 0
fi

jq --arg MIN_LENGTH "4" --arg MAX_LENGTH "" --from-file "$JQ_FILTER_SCRIPT" \
  "$MOCKS_DIR"/all-words-data.json |
  jq --compact-output --from-file "$JQ_PARSE_SCRIPT" \
    >"$MOCKS_DIR"/definitions.json

echo
echo -e "${GREEN}[defs]: Generated definitions.json!${NOCOLOR}"
echo -e "${YELLOW}[defs]: DO NOT FORGET to update 'npoint' bin!!!${NOCOLOR}"
sleep 8
