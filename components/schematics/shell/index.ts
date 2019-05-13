import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule } from '../utils/ast';
import { getProjectFromWorkspace, getWorkspace } from '../utils/devkit-utils/config';
import { weuiVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming';

export default function(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addWeUIToPackageJson(),
    addThemeToAppStyles(options),
    addWeUIRootConfig(options),
    addAnimationRootConfig(options),
    updateAppPage(options),
  ]);
}

function addWeUIToPackageJson() {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, 'dependencies', 'ngx-weui', weuiVersion);
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

/** Add ngx-weui module to app.module */
function addWeUIRootConfig(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, 'WeUiModule', 'ngx-weui', project);

    return host;
  };
}

/** Add browser animation module to app.module */
function addAnimationRootConfig(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);

    return host;
  };
}

const appHTML = `<div style="text-align:center; padding: 8px;">
<h1>
  ngx-weui
</h1>
<p>
  ngx-weui 是 WeUI 的 Angular 版本，
  WeUI
  是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。
</p>
<p>
</p>
<div style="margin-top: 16px;">
  <button weui-button>Button</button>
</div>
</div>
`;

function updateAppPage(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project) as any;

    const appHTMLFile = `${project.sourceRoot}/app/app.component.html`;
    if (host.exists(appHTMLFile)) {
      host.overwrite(appHTMLFile, appHTML);
    }

    return host;
  };
}
