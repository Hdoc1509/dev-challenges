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

source "$SCRIPTS_DIR"/utils.bash
source "$SCRIPTS_DIR"/prepare-data.bash

generate_mock() {
  local target_file=""
  local target_file_total=""
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
  target_file_total="$MOCKS_DIR"/words/"$file_name"-total.json

  if
    is_up_to_date "$JQ_FILTER_SCRIPT" &&
      [[ -f "$target_file" ]] &&
      [[ -f "$target_file_total" ]]
  then
    echo -e "${YELLOW}[words]: $file_name.json and $file_name-total.json are up to date!${NOCOLOR}"
    echo -e "${YELLOW}[words]: Skipping generation...${NOCOLOR}"
    return
  fi

  if [[ -f "$target_file" ]]; then
    words_initial_count="$(jq -r 'length' "$target_file")"
  fi

  jq --arg MIN_LENGTH "$min" --arg MAX_LENGTH "$max" --from-file "$JQ_FILTER_SCRIPT" \
    "$MOCKS_DIR"/all-words-data.json | jq --compact-output '[keys[]]' \
    >"$target_file"
  echo -e "${GREEN}[words]: Generated $file_name.json!${NOCOLOR}"

  words_final_count="$(jq -r 'length' "$target_file")"

  echo "$words_final_count" >"$MOCKS_DIR"/words/"$file_name"-total.json
  echo -e "${GREEN}[words]: Generated $file_name-total.json!${NOCOLOR}"

  if [[ $words_initial_count -gt 0 && $words_initial_count != "$words_final_count" ]]; then
    echo -e "${YELLOW}[words]: $file_name.json has changed!"
    echo -e "${YELLOW}[words]: Previous count: $words_initial_count${NOCOLOR}"
    echo -e "${YELLOW}[words]: Current count: $words_final_count${NOCOLOR}"
  fi
}

if [[ ! -d "$MOCKS_DIR"/words ]]; then
  mkdir -p "$MOCKS_DIR"/words
fi

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
