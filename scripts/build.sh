mkdir dist
mkdir dist/legacy

pnpm --filter=\!weather-app --filter=\!github-jobs build
# pnpm run -r build

for dist in legacy/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  echo "Checking $dist"
  echo "App (legacy) dirname: $app_name"

  mv --verbose "$dist" dist/legacy/"$app_name"

  echo
done
