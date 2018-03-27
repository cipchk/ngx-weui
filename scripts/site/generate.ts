import * as path from 'path';
import { generateModule } from './utils/generate-module';

const target = process.argv[2];
const isSyncSpecific = !!target && (target !== 'init');

if (!target) throw new Error(`必须指定生成类型，init 表示全部`);

const rootDir = path.resolve(__dirname, '../../');
const config = require(path.join(rootDir, 'src/site.config.js'));

for (const m of config.modules) {
    generateModule(m, isSyncSpecific, target, rootDir);
}
