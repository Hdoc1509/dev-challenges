mkdir --parents dist/legacy

build_cmd=(pnpm)
# items refers to `name` field in package.json
ignored_apps=(quote-generator weather-app github-jobs)

for item in "${ignored_apps[@]}"; do
  build_cmd+=(--filter=!"$item")
done

build_cmd+=(build)

if ! "${build_cmd[@]}"; then
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
