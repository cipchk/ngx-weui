const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');

function compileLess(content, savePath, min) {
  return new Promise((resolve, reject) => {
    const plugins = [];
    if (min) {
      const cleanCSSPlugin = new LessPluginCleanCSS({
        advanced: true
      });
      plugins.push(cleanCSSPlugin);
    }
    return less.render
      .call(less, content, {
        plugins
      })
      .then(({
        css
      }) => {
        fs.writeFileSync(savePath, css);
        resolve();
      })
      .catch(err => reject(err));
  });
}

const sourcePath = path.resolve(__dirname, '../../components');
const targetPath = path.resolve(__dirname, '../../publish');

const targetFolder = fs.readdirSync(targetPath);
let componentsStyleContent = '@import "./style/theme.less";\n';
fse.copySync(`${sourcePath}/style`, `${targetPath}/style`);
targetFolder.forEach(dir => {
  if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
    componentsStyleContent += `@import "./${dir}/style/index.less";\n`
    fse.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
  }
})

const savePath = path.resolve(__dirname, '../../publish/');
fs.writeFileSync(path.join(savePath, 'index.less'), componentsStyleContent);

const lessContent = `@import "${savePath}/index.less";`;
compileLess(lessContent, path.join(savePath, 'index.css'), false).then().catch();
compileLess(lessContent, path.join(savePath, 'index.min.css'), true).then().catch();