mkdir dist
pnpm --filter button-component build
# pnpm run -r build

for dist in apps/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  echo "Checking $dist"
  echo "App dirname: $app_name"

  echo "Moving $dist to dist/$app_name"
  # mv "$dist" dist

  echo
done
