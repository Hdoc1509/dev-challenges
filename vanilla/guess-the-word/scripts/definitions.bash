#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_FILTER_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq
JQ_PARSE_SCRIPT="$PROJECT_ROOT"/scripts/parse-definitions.jq
EASY_LENGTH="$MOCKS_DIR"/difficulties-by-length/easy.json
MIN_LENGTH="$(jq -r '.min' "$EASY_LENGTH")"

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

branch=$(git branch --show-current)

filter_script_is_up_to_date() {
  git diff --quiet origin/"$branch" "$branch" "$JQ_FILTER_SCRIPT" &&
    git diff --quiet "$JQ_FILTER_SCRIPT"
}

if filter_script_is_up_to_date &>/dev/null; then
  echo
  echo -e "${YELLOW}[defs]: Filter script is up to date"
  echo -e "${YELLOW}[defs]: Skipping generation...${NOCOLOR}"
  exit 0
fi

jq --arg MIN_LENGTH "$MIN_LENGTH" --arg MAX_LENGTH "" --from-file "$JQ_FILTER_SCRIPT" \
  "$MOCKS_DIR"/all-words-data.json |
  jq --compact-output --from-file "$JQ_PARSE_SCRIPT" \
    >"$MOCKS_DIR"/definitions.json

echo
echo -e "${GREEN}[defs]: Generated definitions.json!${NOCOLOR}"
echo -e "${YELLOW}[defs]: DO NOT FORGET to update 'npoint' bin!!!${NOCOLOR}"
sleep 8
