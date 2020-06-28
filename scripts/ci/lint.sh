#!/bin/bash

set -e

readonly thisDir=$(cd $(dirname $0); pwd)

cd $(dirname $0)/../..

TS=false
LESS=false

for ARG in "$@"; do
  case "$ARG" in
    -ts)
      TS=true
      ;;
    -less)
      LESS=true
      ;;
  esac
done

if [[ ${TS} == true ]]; then
  $(npm bin)/tslint -p tsconfig.json -c tslint.json 'components/**/*.ts'
fi

if [[ ${LESS} == true ]]; then
  $(npm bin)/stylelint 'components/**/*.less' --syntax less
  $(npm bin)/stylelint 'src/**/*.less' --syntax less
fi

