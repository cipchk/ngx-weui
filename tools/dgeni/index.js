const path = require('path');
const fs = require('fs');
const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

// dgeni packages
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const typescriptPackage = require('dgeni-packages/typescript');

// Project configuration.
const projectRootDir = path.resolve(__dirname, '../..');
const sourceDir = path.resolve(projectRootDir, 'src/');
const outputDir = path.resolve(projectRootDir, 'demo/src/assets/docs/api');
const templateDir = path.resolve(__dirname, './templates');


const dgeniPackageDeps = [
    jsdocPackage,
    nunjucksPackage,
    typescriptPackage,
];

let apiDocsPackage = new DgeniPackage('ngx-weui-api-docs', dgeniPackageDeps)

.processor(require('./processors/link-inherited-docs'))

// Processor that filters out symbols that should not be shown in the docs.
.processor(require('./processors/docs-private-filter'))

// Processor that appends categorization flags to the docs, e.g. `isDirective`, `isNgModule`, etc.
.processor(require('./processors/categorizer'))

// Processor to group components into top-level groups such as "Tabs", "Sidenav", etc.
.processor(require('./processors/component-grouper'))

.config(function(log) {
    log.level = 'info';
})

// Configure the processor for reading files from the file system.
.config(function(readFilesProcessor, writeFilesProcessor) {
    readFilesProcessor.basePath = sourceDir;
    readFilesProcessor.$enabled = false; // disable for now as we are using readTypeScriptModules

    writeFilesProcessor.outputFolder = outputDir;
})

// Configure the output path for written files (i.e., file names).
.config(function(computePathsProcessor) {
    computePathsProcessor.pathTemplates = [{
        docTypes: ['componentGroup'],
        pathTemplate: '${name}',
        outputPathTemplate: '${name}.html',
    }];
})

// Configure custom JsDoc tags.
.config(function(parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
        { name: 'docs-private' },
        { name: 'default' },
        { name: 'external' },
        { name: 'see' },
        { name: 'todo' },
        { name: 'this' },
        { name: 'readonly' }
    ]);
})

// Configure the processor for understanding TypeScript.
.config(function(readTypeScriptModules) {
    readTypeScriptModules.basePath = sourceDir;
    readTypeScriptModules.ignoreExportsMatching = [/^_/];
    readTypeScriptModules.hidePrivateMembers = true;

    // Entry points for docs generation. All publically exported symbols found through these
    // files will have docs generated.
    readTypeScriptModules.sourceFiles = [
        'actionsheet/index.ts',
        'button/index.ts',
        'cell/index.ts',
        'dialog/index.ts',
        'form/index.ts',
        'gallery/index.ts',
        'infiniteloader/index.ts',
        'loadmore/index.ts',
        'picker/index.ts',
        'popup/index.ts',
        'progress/index.ts',
        'ptr/index.ts',
        'searchbar/index.ts',
        'slider/index.ts',
        'tab/index.ts',
        'toast/index.ts',
        'toptips/index.ts',
        'uploader/index.ts',
        'sidebar/index.ts',
        'swiper/index.ts',
        'chart-g2/index.ts',
        'jweixin/index.ts',
        'accordion/index.ts',
        'mask/index.ts',
        'rating/index.ts',
        'stepper/index.ts',
        'pagination/index.ts'
    ];
})


// Configure processor for finding nunjucks templates.
.config(function(templateFinder, templateEngine) {
    // Where to find the templates for the doc rendering
    templateFinder.templateFolders = [templateDir];

    // Standard patterns for matching docs to templates
    templateFinder.templatePatterns = [
        '${ doc.template }',
        '${ doc.id }.${ doc.docType }.template.html',
        '${ doc.id }.template.html',
        '${ doc.docType }.template.html',
        '${ doc.id }.${ doc.docType }.template.js',
        '${ doc.id }.template.js',
        '${ doc.docType }.template.js',
        '${ doc.id }.${ doc.docType }.template.json',
        '${ doc.id }.template.json',
        '${ doc.docType }.template.json',
        'common.template.html'
    ];

    // Nunjucks and Angular conflict in their template bindings so change Nunjucks
    templateEngine.config.tags = {
        variableStart: '{$',
        variableEnd: '$}'
    };
});


module.exports = apiDocsPackage;
