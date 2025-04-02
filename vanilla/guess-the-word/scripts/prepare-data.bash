REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks
SCRIPTS_DIR="$PROJECT_ROOT"/scripts
WORDSAPI_SAMPLE="$MOCKS_DIR"/wordsapi_sample.json
CUSTOM_WORDS_DATA="$MOCKS_DIR"/custom-words-data.json
TARGET_FILE="$MOCKS_DIR"/all-words-data.json

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

source "$SCRIPTS_DIR"/utils.bash

if is_up_to_date "$WORDSAPI_SAMPLE" && is_up_to_date "$CUSTOM_WORDS_DATA" && [[ -f "$TARGET_FILE" ]]; then
  echo -e "${YELLOW}[prepare-data]: Source files are up to date"
  echo -e "${YELLOW}[prepare-data]: Skipping generation...${NOCOLOR}"
  exit 0
fi

if [[ ! -f "$TARGET_FILE" ]]; then
  jq --slurp --compact-output 'reduce .[] as $item ({}; . * $item)' \
    "$WORDSAPI_SAMPLE" "$CUSTOM_WORDS_DATA" >"$TARGET_FILE"
  echo -e "${GREEN}[prepare-data]: All words data mock generated!${NOCOLOR}"
else
  echo -e "${YELLOW}[prepare-data]: All words data mock already exists"
  echo -e "${YELLOW}[prepare-data]: Skipping generation...${NOCOLOR}"
fi
