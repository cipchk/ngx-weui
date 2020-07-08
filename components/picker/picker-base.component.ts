import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ngx-weui/core';
import { PickerConfig } from './picker.config';
import { PickerOptions } from './picker.types';

@Component({})
export class PickerBaseComponent {
  /** 配置项 */
  @Input() options: PickerOptions;
  /** 当options.type=='form'时，占位符文本 */
  @Input() placeholder: string;
  @Input() title: string;
  @Input() @InputBoolean() disabled: boolean;
  /** 列变更时回调 */
  @Output() readonly groupChange = new EventEmitter<any>();
  /** 取消后回调 */
  @Output() readonly cancel = new EventEmitter();
  /** 显示时回调 */
  @Output() readonly show = new EventEmitter();
  /** 隐藏后回调 */
  @Output() readonly hide = new EventEmitter();

  constructor(protected DEF: PickerConfig) {}

  writeValue(_value: any): void {}
}
