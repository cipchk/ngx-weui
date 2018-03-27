const fs = require('fs');
const fse = require('fs-extra');
const MT = require('mark-twain');
import { generateMd } from './generate-md';

export function parseMd(file: any) {
    let mt = null;
    try {
        mt = MT(file);
    } catch (err) {
        console.error(`invalid ${file}`, err);
        return;
    }

    const result = generateMd(mt);
    result.meta = mt.meta;

    return result;
}
