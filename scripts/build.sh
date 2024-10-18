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

echo

for dist in {legacy,vanilla}/*/dist; do
  app_name="$(basename "$(dirname "$dist")")"

  if echo "$dist" | grep --quiet "legacy"; then
    echo "App dirname: $app_name (legacy)"
    mv --verbose "$dist" dist/legacy/"$app_name"
  else
    echo "App dirname: $app_name"
    mv --verbose "$dist" dist/"$app_name"
  fi

  echo
done
