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

get_challenge_title() {
  local app_path="$1"
  head --lines=1 "$app_path/README.md" |
    awk -F ">" '{ print $2 }' |
    awk -F "<" '{ print $1 }'
}

echo

for dist in {legacy,vanilla}/*/dist; do
  app_path="$(dirname "$dist")"
  app_dirname="$(basename "$app_path")"
  challenge_title="$(get_challenge_title "$app_path")"

  if echo "$dist" | grep --quiet "legacy"; then
    echo "[== $challenge_title ==] (legacy)"
    mv --verbose "$dist" dist/legacy/"$app_dirname"
  else
    echo "[== $challenge_title ==]"
    mv --verbose "$dist" dist/"$app_dirname"
  fi

  echo
done
