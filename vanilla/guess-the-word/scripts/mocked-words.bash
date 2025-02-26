#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_ROOT="$REPO_ROOT"/vanilla/guess-the-word

export PROJECT_ROOT

"$PROJECT_ROOT"/scripts/generate-mock.bash --min-length 4 --max-length 9 --name normal
"$PROJECT_ROOT"/scripts/generate-mock.bash --min-length 10 --name extreme
