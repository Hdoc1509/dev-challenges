# NOTE: filter words that are not family friendly

. | [
  keys[] |
  select(test("porn") | not) |
    select(test("^[a-z]{10,}$"))
]
