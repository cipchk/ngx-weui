import {Project} from '../utils/devkit-utils/config';

/** Create custom theme for the given application configuration. */
export function createCustomTheme(project: Project) {
  const name = project.name || 'app';
  return `// cli v6 bug，暂不支持 ~weui 写法，相关ISSUES
// - [#10717](https://github.com/angular/angular-cli/issues/10717)
// - [#10721](https://github.com/angular/angular-cli/issues/10721)
// @import '~weui/src/style/weui.less';
// @import '~ngx-weui/index';
@import '../node_modules/weui/src/style/weui.less';
@import '../node_modules/ngx-weui/index';

// [自定义主题](https://cipchk.github.io/ngx-weui/#/docs/style)
// @weuiFontDefault: "Helvetica Neue";
// @weuiBtnPrimaryBg: #f50;

`;
}
