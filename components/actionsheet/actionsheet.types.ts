import { NwSafeAny } from 'ngx-weui/core';

export interface ActionSheetMenuItem {
  text: string;

  value?: NwSafeAny;

  /**
   * - `warn` 表示负向菜单
   */
  type?: 'warn';

  [key: string]: NwSafeAny;
}
