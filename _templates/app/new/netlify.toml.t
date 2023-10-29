---
to: apps/<%= name %>/netlify.toml
---


[build]
  command = 'pnpm --filter <%= name %> build'
  publish = 'apps/<%= name %>/dist'
  ignore = 'bash ./scripts/docs-check.sh apps/<%= name %>'
