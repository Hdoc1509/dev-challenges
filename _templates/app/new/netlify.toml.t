---
to: apps/<%= name %>/netlify.toml
---


[build]
  command = 'nx build <%= name %>'
  publish = 'apps/<%= name %>/dist'
  ignore = 'bash ./scripts/docs-check.sh app/<%= name %>'
