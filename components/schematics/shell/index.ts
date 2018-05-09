import {
  Rule,
  chain,
  noop,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';
import { addPackageToPackageJson } from '../utils/package';
import { weuiVersion } from '../utils/lib-versions';
import {
  getProjectFromWorkspace,
  getWorkspace,
} from '../utils/devkit-utils/config';
import { addThemeToAppStyles } from './theming';
import { addModuleImportToRootModule } from '../utils/ast';

export default function(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addWeUIToPackageJson(),
    addThemeToAppStyles(options),
    addAnimationRootConfig(options),
  ]);
}

function addWeUIToPackageJson() {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, 'dependencies', 'ngx-weui', weuiVersion);
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

/** Add browser animation module to app.module */
function addAnimationRootConfig(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(
      host,
      'BrowserAnimationsModule',
      '@angular/platform-browser/animations',
      project,
    );

    return host;
  };
}
