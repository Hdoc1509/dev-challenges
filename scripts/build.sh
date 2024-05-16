APPS=(
  button-component
  # input-component
  # windbnb
  # todo-app
  # random-quote-generator
  # country-quiz
  # weather-app
  # github-jobs
)

mkdir dist
pnpm --filter button-component build
# pnpm run -r build

for app in "${APPS[@]}"; do
  mv apps/"$app"/dist dist/"$app"
done
