#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
SCRIPTS_DIR="$PROJECT_ROOT"/scripts
JQ_FILTER_SCRIPT="$SCRIPTS_DIR"/filter-words.jq
JQ_PARSE_SCRIPT="$SCRIPTS_DIR"/parse-definitions.jq
DEFINITIONS_FILE="$MOCKS_DIR"/definitions.json
EASY_LENGTH="$MOCKS_DIR"/difficulties-by-length/easy.json
MIN_LENGTH="$(jq -r '.min' "$EASY_LENGTH")"

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

source "$SCRIPTS_DIR"/utils.bash

if is_up_to_date "$JQ_FILTER_SCRIPT" && [[ -f "$DEFINITIONS_FILE" ]]; then
  echo
  echo -e "${YELLOW}[defs]: Filter script is up to date"
  echo -e "${YELLOW}[defs]: Skipping generation...${NOCOLOR}"
  exit 0
fi

jq --arg MIN_LENGTH "$MIN_LENGTH" --arg MAX_LENGTH "" --from-file "$JQ_FILTER_SCRIPT" \
  "$MOCKS_DIR"/all-words-data.json |
  jq --compact-output --from-file "$JQ_PARSE_SCRIPT" >"$DEFINITIONS_FILE"

jq 'length' "$DEFINITIONS_FILE" >"$MOCKS_DIR"/words-total.json
echo
echo -e "${GREEN}[defs]: Generated words-total.json!${NOCOLOR}"
echo -e "${GREEN}[defs]: Generated definitions.json!${NOCOLOR}"
echo -e "${YELLOW}[defs]: DO NOT FORGET to update 'npoint' bin!!!${NOCOLOR}"
sleep 8
