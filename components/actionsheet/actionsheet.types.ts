export interface ActionSheetMenuItem {
  text: string;
  value?: any;
  /**
   * - `warn` 表示负向菜单
   */
  type?: 'warn';
  [key: string]: any;
}
