import * as path from 'path';
import * as fs from 'fs';
const fse = require('fs-extra');
import { parseMd } from './parse-md';
import { generateDoc, genUpperName, escapeHTML } from './utils';

export function generateModule(config: any, isSyncSpecific: boolean, target: string, rootDir: string) {
    const srcPath = path.join(rootDir, config.src);
    const targetPath = path.join(rootDir, config.dist);
    const tpl = {
        meta: fs.readFileSync(path.join(rootDir, config.template.meta)).toString('utf8')
    };

    const metas: any[] = [];

    function genDocMeta(file: any, fileName: string) {
        const md = parseMd(file);
        const name = fileName.split('.')[0];
        const meta: any = {
            name,
            content: md.content,
            meta: md.meta,
            path: `/docs/${fileName}`
        };
        metas.push(meta);
    }

    function genComponentMeta(file: any, dirName: string) {
        const md = parseMd(file);
        const meta: any = {
            name: dirName,
            data: {
                content: md.content,
                api: md.api
            },
            meta: md.meta,
            path: `/components/${dirName}/index.md`,
            componentName: `${genUpperName(config.name)}${genUpperName(dirName)}Component`
        };
        metas.push(meta);
    }

    function genExamples(exampleConfig: { src: string, template: string }) {
        if (!exampleConfig) return ;

        const examples: any = {};
        const exampleDir = path.join(rootDir, exampleConfig.src);
        fse.readdirSync(exampleDir).forEach((dirName: string) => {
            const demoDir = path.join(exampleDir, dirName);
            if (!fse.statSync(demoDir).isDirectory()) return;
            examples[dirName] = {
                html: getCode(path.join(demoDir, `${dirName}.component.html`)),
                ts: getCode(path.join(demoDir, `${dirName}.component.ts`)),
                scss: getCode(path.join(demoDir, `${dirName}.component.scss`))
            };
        });
        generateDoc(
            { data: JSON.stringify(examples) },
            fs.readFileSync(path.join(rootDir, exampleConfig.template)).toString('utf8'),
            path.join(targetPath, `examples.ts`)
        );
    }

    function getCode(file: string) {
        if (!fs.existsSync(file)) return '';
        return escapeHTML(fse.readFileSync(file, 'utf8'));
    }

    fse.readdirSync(srcPath).forEach((dirName: string) => {
        if (isSyncSpecific && dirName !== target) return;
        if (config.ignores && ~config.ignores.indexOf(dirName)) return;

        const srcDirPath = path.join(srcPath, dirName);
        if (config.name === 'docs') {
            genDocMeta(
                fse.readFileSync(srcDirPath),
                dirName
            );
        } else {
            if (!fse.statSync(srcDirPath).isDirectory()) return;
            const indexMd = path.join(srcPath, dirName, 'index.md');
            if (!fs.existsSync(indexMd)) return ;
            genComponentMeta(
                fse.readFileSync(indexMd),
                dirName
            );
        }
    });

    generateDoc({ data: JSON.stringify(metas) }, tpl.meta, path.join(targetPath, `meta.ts`));

    // examples
    genExamples(config.example);
}
