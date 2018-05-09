import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { getStylesPath } from '../utils/ast';
import { InsertChange } from '../utils/devkit-utils/change';
import {
  getProjectFromWorkspace,
  getWorkspace,
  Project,
  Workspace,
} from '../utils/devkit-utils/config';
import { createCustomTheme } from './custom-theme';

export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
  return function(host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    // Because the build setup for the Angular CLI can be changed so dramatically, we can't know
    // where to generate anything if the project is not using the default config for build and test.
    assertDefaultProjectConfig(project);

    const stylesPath = getStylesPath(host, project);
    if (stylesPath.endsWith('.less')) {
      console.error(`Your project is not using less styles, current file: ${stylesPath}`);
    }
    const buffer = host.read(stylesPath);
    if (buffer) {
      const insertion = new InsertChange(
        stylesPath,
        0,
        createCustomTheme(project),
      );
      const recorder = host.beginUpdate(stylesPath);
      recorder.insertLeft(insertion.pos, insertion.toAdd);
      host.commitUpdate(recorder);
    } else {
      console.warn(`Skipped insert style; could not find file: ${stylesPath}`);
    }

    return host;
  };
}

/** Throws if the project is not using the default build and test config. */
function assertDefaultProjectConfig(project: Project) {
  if (!isProjectUsingDefaultConfig(project)) {
    throw new SchematicsException(
      'Your project is not using the default configuration for ' +
        'build and test. The Angular Material schematics can only be used with the default ' +
        'configuration',
    );
  }
}

/** Gets whether the Angular CLI project is using the default build configuration. */
function isProjectUsingDefaultConfig(project: Project) {
  const defaultBuilder = '@angular-devkit/build-angular:browser';

  return (
    project.architect &&
    project.architect['build'] &&
    project.architect['build']['builder'] === defaultBuilder &&
    project.architect['test'] &&
    project.architect['build']['builder'] === defaultBuilder
  );
}
