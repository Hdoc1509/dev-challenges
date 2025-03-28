branch=$(git branch --show-current)

filter_script_is_up_to_date() {
  git diff --quiet origin/"$branch" "$branch" "$JQ_FILTER_SCRIPT" &&
    git diff --quiet "$JQ_FILTER_SCRIPT"
}
