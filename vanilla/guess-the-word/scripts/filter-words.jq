to_entries |
map(select(.value | has("definitions"))) |
from_entries | [
  keys[] |
  # NOTE: filter words that are not family friendly
  select(test("porn") | not) |
  # filter roman numbers
  select(test("^(xxii|xxxiv)$") | not) |
  select(test("[aeiou]")) |
  select(test("^[a-z]{\($MIN_LENGTH),\($MAX_LENGTH)}$"))
]
