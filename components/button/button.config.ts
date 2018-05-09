import { Injectable } from '@angular/core';
import { ButtonType } from '../utils/types';

@Injectable()
export class ButtonConfig {
  /**
   * 操作场景：primary、default、warn
   */
  type: ButtonType = 'primary';

  /**
   * disabled状态，默认：`false`
   */
  disabled: boolean = false;

  /**
   * 是否加载状态，默认：`false`
   */
  loading: boolean = false;

  /**
   * 镂空按钮，默认：`false`
   */
  plain: boolean = false;

  /**
   * 是否小号，默认：`false`
   */
  mini: boolean = false;
}
