to_entries |
map({
  key,
  value: { definitions: .value.definitions[:3] | map(.definition) }
}) |
from_entries
