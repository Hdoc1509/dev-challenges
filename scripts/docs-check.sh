echo "prev commit: $CACHED_COMMIT_REF"
echo "current commit: $COMMIT_REF"

if [[ $COMMIT_REF == "$CACHED_COMMIT_REF" ]]; then
  exit 1
fi

__package_dir="$1"
git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" "${__package_dir}" ||
  git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF" "${__package_dir}" |
  tr -d '\n' | grep -q "^${__package_dir}/README.md\$"
status=$?
echo "diff exit code: ${status}"
exit $status
