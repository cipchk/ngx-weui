export interface PickerOptions {
  /**
   * 类型
   * default：无任何显示
   * form：会以表单的形式出现
   * @see https://cipchk.github.io/ngx-weui/#/example/picker
   */
  type?: 'default' | 'form';

  /**
   * 提示分隔符信息，当type==='form'时有效
   */
  separator?: string;

  /**
   * 取消按钮文本，默认：`取消`
   */
  cancel?: string;

  /**
   * 确定按钮文本，默认：`确定`
   */
  confirm?: string;

  /**
   * 允许点击背景关闭，默认：`true`
   */
  backdrop?: boolean;
}
