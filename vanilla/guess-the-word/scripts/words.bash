#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
SCRIPTS_DIR="$PROJECT_ROOT"/scripts
JQ_FILTER_SCRIPT="$SCRIPTS_DIR"/filter-words.jq
EASY_LENGTH="$MOCKS_DIR"/difficulties-by-length/easy.json
NORMAL_MASTER_LENGTH="$MOCKS_DIR"/difficulties-by-length/normal-master.json
EXTREME_INSANE_LENGTH="$MOCKS_DIR"/difficulties-by-length/extreme-insane.json
WHY_VOID_LENGTH="$MOCKS_DIR"/difficulties-by-length/why-void.json
GENERAL_MIN_LENGTH="$(jq -r '.min' "$EASY_LENGTH")"

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'

export JQ_FILTER_SCRIPT

source "$SCRIPTS_DIR"/check-filter-script.bash

if filter_script_is_up_to_date &>/dev/null; then
  echo
  echo -e "${YELLOW}[words]: Filter script is up to date"
  echo -e "${YELLOW}[words]: Skipping generation...${NOCOLOR}"
  exit 0
fi

generate_mock() {
  local target_file=""
  local min=$GENERAL_MIN_LENGTH
  local max=""
  local file_name=""
  local words_initial_count=0
  local words_final_count=0

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

  target_file="$MOCKS_DIR"/words/"$file_name".json

  if [[ -f "$target_file" ]]; then
    words_initial_count="$(jq -r 'length' "$target_file")"
  fi

  jq --arg MIN_LENGTH "$min" --arg MAX_LENGTH "$max" --from-file "$JQ_FILTER_SCRIPT" \
    "$MOCKS_DIR"/all-words-data.json | jq --compact-output '[keys[]]' \
    >"$target_file"

  words_final_count="$(jq -r 'length' "$target_file")"

  echo -e "${GREEN}[words]: Generated $file_name.json!${NOCOLOR}"

  if [[ $words_initial_count -gt 0 && $words_initial_count != "$words_final_count" ]]; then
    echo -e "${YELLOW}[words]: $file_name.json has changed!"
    echo -e "${YELLOW}[words]: Previous count: $words_initial_count${NOCOLOR}"
    echo -e "${YELLOW}[words]: Current count: $words_final_count${NOCOLOR}"
  fi
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
