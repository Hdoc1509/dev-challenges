REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word
MOCKS_DIR="$PROJECT_ROOT"/src/mocks

NOCOLOR='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

if [[ ! -f "$MOCKS_DIR"/all-words-data.json ]]; then
  jq --slurp --compact-output 'reduce .[] as $item ({}; . * $item)' \
    "$MOCKS_DIR"/wordsapi_sample.json "$MOCKS_DIR"/custom-words-data.json \
    >"$MOCKS_DIR"/all-words-data.json
  echo -e "${GREEN}[prepare-data]: All words data mock generated!${NOCOLOR}"
else
  echo -e "${YELLOW}[prepare-data]: All words data mock already exists"
  echo -e "${YELLOW}[prepare-data]: Skipping generation...${NOCOLOR}"
fi
