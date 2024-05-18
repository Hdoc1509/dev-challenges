mkdir dist

# https://pnpm.io/cli/run#--aggregate-output
pnpm --aggregate-output --filter=\!weather-app --filter=\!github-jobs build
# pnpm run -r build

for dist in apps/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  echo "Checking $dist"
  echo "App dirname: $app_name"

  mv --verbose "$dist" dist/"$app_name"

  echo
done
