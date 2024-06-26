#!/bin/bash

project=$1
service=$2
cwd=$3

service_path="$cwd/$project/src/services/$service"

if [[ $project =~ ^vanilla ]]; then
  # touch "$cwd/testing.txt"

  mv "$service_path/client.ts" "$service_path/index.ts"
fi
