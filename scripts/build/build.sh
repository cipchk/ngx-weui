#!/usr/bin/env bash
#!/usr/bin/env node --max-old-space-size=4096

set -u -e -o pipefail

cd $(dirname $0)/../..

addBanners() {
  echo ">> add branners"
  for file in ${1}/*; do
    if [[ -f ${file} && "${file##*.}" != "map" ]]; then
      cat ${LICENSE_BANNER} > ${file}.tmp
      cat ${file} >> ${file}.tmp
      mv ${file}.tmp ${file}
    fi
  done
}

updateVersionReferences() {
  NPM_DIR="$1"
  (
    echo ">> VERSION: Updating version references in ${NPM_DIR}"
    cd ${NPM_DIR}
    perl -p -i -e "s/PEER\-0\.0\.0\-PLACEHOLDER/^${VERSION}/g" $(grep -ril PEER\-0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
  )
}

buildSchematics() {
  echo '>> Compiling schematics'
  schematics_source_dir=${PWD}/components/schematics/
  schematics_dist_dir=${PWD}/publish/schematics/
  $(npm bin)/tsc -p ${schematics_source_dir}tsconfig.json
  echo '>>>> Coping all json files'
  rsync -am --include="*.json" --include="*/" --exclude=* ${schematics_source_dir}/ ${schematics_dist_dir}/
}

PWD=`pwd`
VERSION=$(node -p "require('./package.json').version")
SOURCE=${PWD}/components
DIST=${PWD}/publish

echo "=====BUILDING: Version ${VERSION}"

rm -rf ${DIST}
mkdir -p ${DIST}

# build
$(npm bin)/ng build ngx-weui-lib

# license banner
LICENSE_BANNER=${SOURCE}/license-banner.txt
addBanners ${DIST}/bundles

# package version
updateVersionReferences ${DIST}

echo ">> generate css"
node ./scripts/build/generate-css.js

echo 'Build schematics'
buildSchematics

# copy readme
cp README.md ${DIST}/README.md