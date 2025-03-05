to_entries |
map({
  key,
  value: .value.definitions[:3] |
    map(.definition | (.[:1] | ascii_upcase) + .[1:])
}) |
from_entries
