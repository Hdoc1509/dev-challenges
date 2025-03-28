#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
JQ_SCRIPT="$PROJECT_ROOT"/scripts/filter-words.jq
EASY_LENGTH="$MOCKS_DIR"/difficulties-by-length/easy.json
NORMAL_MASTER_LENGTH="$MOCKS_DIR"/difficulties-by-length/normal-master.json
EXTREME_INSANE_LENGTH="$MOCKS_DIR"/difficulties-by-length/extreme-insane.json
WHY_VOID_LENGTH="$MOCKS_DIR"/difficulties-by-length/why-void.json

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'

branch=$(git branch --show-current)

if git diff --quiet origin/"$branch" "$branch" "$JQ_SCRIPT" &&
  git diff --quiet "$JQ_SCRIPT"; then
  echo
  echo -e "${YELLOW}[words]: Filter script is up to date"
  echo -e "${YELLOW}[words]: Skipping generation...${NOCOLOR}"
  exit 0
fi

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

generate_mock --max-length "$(jq -r '.max' "$EASY_LENGTH")" --name easy
generate_mock \
  --min-length "$(jq -r '.min' "$NORMAL_MASTER_LENGTH")" \
  --max-length "$(jq -r '.max' "$NORMAL_MASTER_LENGTH")" \
  --name normal
generate_mock \
  --min-length "$(jq -r '.min' "$EXTREME_INSANE_LENGTH")" \
  --max-length "$(jq -r '.max' "$EXTREME_INSANE_LENGTH")" \
  --name extreme
generate_mock --min-length "$(jq -r '.min' "$WHY_VOID_LENGTH")" --name why

jq 'length' "$MOCKS_DIR"/definitions.json >"$MOCKS_DIR"/words-total.json
echo -e "${GREEN}[words]: Generated words-total.json!${NOCOLOR}"
