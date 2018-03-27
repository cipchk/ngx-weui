const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../../components');
const targetPath = path.resolve(__dirname, '../../publish/src');

const targetFolder = fs.readdirSync(targetPath);
let componentsStyleContent = '';
targetFolder.forEach(dir => {
    if (fs.existsSync(`${sourcePath}/${dir}/style/index.scss`)) {
      componentsStyleContent += `@import "./src/${dir}/style/index.scss";\n`
     fse.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
    }
  }
)
fs.writeFileSync(path.resolve(__dirname, '../../publish/index.scss'), componentsStyleContent);
