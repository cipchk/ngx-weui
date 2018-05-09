import { Injectable } from '@angular/core';
import { PaginationMode } from './pagination.type';

@Injectable()
export class PaginationConfig {
  /**
   * 形态，可选 `button`,`pointer`，默认：`button`
   */
  mode: PaginationMode = 'button';
  /**
   * 是否隐藏数值，默认：`false`
   */
  simple: boolean = false;

  /**
   * 小号按钮，默认：`true`
   */
  mini: boolean = true;

  /**
   * 上一页文本（支持HTML），默认：`上一页`
   */
  prevText: string = '上一页';
  /**
   * 下一页文本（支持HTML），默认：`下一步`
   */
  nextText: string = '下一步';
}
