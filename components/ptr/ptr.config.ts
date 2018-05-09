import { Injectable } from '@angular/core';

@Injectable()
export class PTRConfig {
  /**
   * 是否使用默认icon样式，默认：`false`
   */
  customIcon?: boolean = false;
  /**
   * 下拉icon，支持HTML
   */
  pullIcon?: string = '<i class="weui-icon-download"></i>';

  /**
   * 加载中icon，支持HTML
   */
  loadingIcon?: string = '<i class="weui-loading"></i>';

  /**
   * 加载成功icon，支持HTML
   */
  successIcon?: string = '<i class="weui-icon-success"></i>';

  /**
   * 下拉刷新容器高度（单位：px），默认：`100`
   */
  height?: number = 100;

  /**
   * 下拉范围有效（单位：%），默认：`80`
   */
  treshold?: number = 80;
}
