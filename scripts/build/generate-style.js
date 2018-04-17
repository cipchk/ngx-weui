const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../../components');
const targetPath = path.resolve(__dirname, '../../publish/src');

const targetFolder = fs.readdirSync(targetPath);
let componentsStyleContent = '@import "./src/style/theme.less";\n';
fse.copySync(`${sourcePath}/style`, `${targetPath}/style`);
targetFolder.forEach(dir => {
    if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
      componentsStyleContent += `@import "./src/${dir}/style/index.less";\n`
     fse.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
    }
  }
)
fs.writeFileSync(path.resolve(__dirname, '../../publish/index.less'), componentsStyleContent);
