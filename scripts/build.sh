mkdir dist
pnpm --filter "*-component" --filter windbnb build
# pnpm run -r build

for dist in apps/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  echo "Checking $dist"
  echo "App dirname: $app_name"

  mv --verbose "$dist" dist/"$app_name"

  echo
done
