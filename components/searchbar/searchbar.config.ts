import { Injectable } from '@angular/core';

@Injectable()
export class SearchBarConfig {
  /**
   * 占位符，默认：`搜索`
   */
  placeholder?: string = '搜索';

  /**
   * 取消按键文字，默认：`取消`
   */
  cancelText?: string = '取消';

  /**
   * 去抖时长（单位：ms），默认：`300`
   */
  debounceTime?: number = 300;
}
