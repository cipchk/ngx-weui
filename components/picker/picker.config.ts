import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PickerConfig {
  /**
   * 取消按钮文本，默认：`取消`
   */
  cancel?: string = '取消';

  /**
   * 确定按钮文本，默认：`确定`
   */
  confirm?: string = '确定';

  /**
   * 允许点击背景关闭，默认：`true`
   */
  backdrop?: boolean = true;
}
