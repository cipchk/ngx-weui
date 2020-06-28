import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule } from '../utils/ast';
import { getProjectFromWorkspace, getWorkspace } from '../utils/devkit-utils/config';
import { weuiVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming';

export default function (options: Schema): Rule {
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

    addModuleImportToRootModule(host, 'ButtonModule', 'ngx-weui/button', project);

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
    NGX-WEUI
  </h1>
  <p>
    <a href="https://github.com/weui/weui" target="_blank">WeUI</a> for angular,
    A UI library by WeChat official design team, includes the most useful widgets/modules in mobile web applications.
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
