import { join } from 'path';

export const MATERIAL_VERSION = require('../../package.json').version;

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');

/** Root build output directory */
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_DEMO_ROOT = join(PROJECT_ROOT, 'demo/dist');

/** Output subdirectory where all bundles will be written (flat ES modules and UMD) */
export const DIST_BUNDLES = join(DIST_ROOT, 'bundles');

export const HTML_MINIFIER_OPTIONS = {
    collapseWhitespace: true,
    removeComments: true,
    caseSensitive: true,
    removeAttributeQuotes: false
};

export const LICENSE_BANNER = `/**
  * @license ngx-weui v${MATERIAL_VERSION}
  * Copyright (c) 2017 cipchk, Inc. http://asdfblog.com/
  * License: MIT
  */`;
