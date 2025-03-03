to_entries |
map(
  select(.value | has("definitions")) |
  # NOTE: filter words that are not family friendly
  select(.key | test("porn") | not) |
  # filter roman numbers
  select(.key | test("^(xxii|xxxiv)$") | not) |
  select(.key | test("[aeiou]")) |
  select(.key | test("^[a-z]{\($MIN_LENGTH),\($MAX_LENGTH)}$"))
) |
from_entries | [
  keys[]
]
