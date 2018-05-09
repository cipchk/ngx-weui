import { Injectable } from '@angular/core';
import { AnimateType } from '../utils/types';

@Injectable()
export class AccordionConfig {
  /**
   * 是否可折叠，`false` 表示保持只有一个可折叠，`true` 表示所有都允许，默认：`false`
   */
  collapsible: boolean = false;
  /**
   * 自动展开第一次，默认：`true`
   */
  activeFirst: boolean = true;
  /**
   * 动画类型，`none` 无动画，`slide` 滑动，默认：`slide`
   */
  animate: AnimateType = 'slide';
}
