---
to: apps/<%= name %>/tsconfig.json
---

{
  "extends": "../../tsconfig.json",
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
