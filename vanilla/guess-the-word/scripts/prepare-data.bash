WORDSAPI_SAMPLE="$MOCKS_DIR"/wordsapi_sample.json
CUSTOM_WORDS_DATA="$MOCKS_DIR"/custom-words-data.json
TARGET_FILE="$MOCKS_DIR"/all-words-data.json

if is_up_to_date "$WORDSAPI_SAMPLE" && is_up_to_date "$CUSTOM_WORDS_DATA" && [[ -f "$TARGET_FILE" ]]; then
  echo -e "${YELLOW}[prepare-data]: Source files are up to date"
  echo -e "${YELLOW}[prepare-data]: Skipping generation...${NOCOLOR}"
  return
fi

jq --slurp --compact-output 'reduce .[] as $item ({}; . * $item)' \
  "$WORDSAPI_SAMPLE" "$CUSTOM_WORDS_DATA" >"$TARGET_FILE"
echo -e "${GREEN}[prepare-data]: Generated all-words-data.json!${NOCOLOR}"
