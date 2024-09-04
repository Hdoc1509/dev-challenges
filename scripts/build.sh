mkdir dist
mkdir dist/legacy

if ! pnpm --filter=!quote-generator --filter=!weather-app --filter=!github-jobs build; then
  echo "ERROR: failed while building. Aborting."
  exit 1
fi

for dist in legacy/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  echo "Checking $dist"
  echo "App (legacy) dirname: $app_name"

  mv --verbose "$dist" dist/legacy/"$app_name"

  echo
done
