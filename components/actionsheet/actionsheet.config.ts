import { Injectable } from '@angular/core';
import { SkinType } from '../utils/types';

@Injectable()
export class ActionSheetConfig {
  /**
   * 样式，默认：`ios`
   */
  skin?: SkinType = 'ios';

  /**
   * 标题
   */
  title?: string;

  /**
   * 取消文本，默认：`取消`
   */
  cancel?: string = '取消';

  /**
   * 允许点击背景关闭，默认：`true`
   */
  backdrop?: boolean = true;
}
