export interface PickerData {
  [key: string]: any;

  /**
   * 显示文本
   */
  label: string;

  /**
   * 值
   */
  value: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;
}
