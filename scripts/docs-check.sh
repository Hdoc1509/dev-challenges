echo "prev commit: $CACHED_COMMIT_REF"
echo "current commit: $COMMIT_REF"
git diff --name-only $CACHED_COMMIT_REF $COMMIT_REF | tr -d '\n' | grep -q "^$1/README.md\$"
status=$?
echo "diff exit code: ${status}"
exit $status
