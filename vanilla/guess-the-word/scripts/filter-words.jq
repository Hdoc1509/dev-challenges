to_entries |
map(
  select(.value | has("definitions")) |
  select(.key | test("^[a-z]{\($MIN_LENGTH),\($MAX_LENGTH)}$")) |
  # NOTE: filter words that are not family friendly
  select(.key | test("porn") | not) |
  select(.key | test("^(xxii|xxxiv|peepshow)$") | not) |
  select(.key | test("[aeiou]"))
) |
from_entries
