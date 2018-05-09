import { Injectable } from '@angular/core';

@Injectable()
export class RatingConfig {
  /**
   * 图标数量（默认：5个）
   */
  max?: number = 5;

  /**
   * 样式名
   */
  cls?: string = '';

  /**
   * 未选中图标，默认：`weui-icon-circle`
   */
  stateOff?: string = 'weui-icon-circle';

  /**
   * 选中图标，默认：`weui-icon-success`
   */
  stateOn?: string = 'weui-icon-success';

  /**
   * 自定义图标，当存在时 `max`、`stateOff`、`stateOn` 失效
   */
  states?: { on: string; off: string }[] = [];

  /**
   * 图标 `title` 属性值，默认以 `1` 开始的索引值
   */
  titles?: string[] = [];
}
