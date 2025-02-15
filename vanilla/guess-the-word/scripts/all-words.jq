# NOTE: filter words that are not family friendly

. | [
  keys[] |
    select(test("^[a-z]{4,}$")) |
    select(test("porn") | not)
]
