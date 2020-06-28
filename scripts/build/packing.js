#!/usr/bin/env node

const path = require('path');
const ngPackage = require('ng-packagr');

const name = process.argv[2];
const target = path.resolve(__dirname, `../../components`);

console.time(`${name}:time`);

ngPackage
  .ngPackagr()
  .forProject(path.resolve(target, `ng-package.json`))
  .withTsConfig(path.resolve(target, 'tsconfig.lib.prod.json'))
  .build()
  .then(() => {
    console.timeEnd(`${name}:time`);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
