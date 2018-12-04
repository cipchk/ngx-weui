import { Project } from '../utils/devkit-utils/config';

/** Create custom theme for the given application configuration. */
export function createCustomTheme(project: Project) {
  const name = project.name || 'app';
  return `@import '~weui/src/style/weui.less';
@import '~ngx-weui/index';

// [自定义主题](https://cipchk.github.io/ngx-weui/#/docs/style)
// @weuiFontDefault: "Helvetica Neue";
// @weuiBtnPrimaryBg: #f50;

`;
}
