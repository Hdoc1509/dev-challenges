branch=$(git branch --show-current)

is_up_to_date() {
  git diff --quiet origin/"$branch" "$branch" "$1" &>/dev/null &&
    git diff --quiet "$1" &>/dev/null
}
