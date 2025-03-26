to_entries |
map(
  select(.value | has("definitions")) |
  #TODO: filter words that has .definitions.similarTo == "cardinal"
  select(.key | test("^[a-z]{\($MIN_LENGTH),\($MAX_LENGTH)}$")) |
  # NOTE: filter words that are not family friendly
  select(.key | test("porn") | not) |
  select(.key | test("^(xxii|xxxiv|peepshow)$") | not) |
  select(.key | test("[aeiou]"))
) |
from_entries

# try to create file src/mocks/filtered-words.json
# this will be imported:
# import WORDS from "@/mocks/filtered-words.json";
# const FILTERED_WORDS = new Set(WORDS);
# when loading savedWords from localStorage,
# if (FILTERED_WORDS.has(word)) continue;
