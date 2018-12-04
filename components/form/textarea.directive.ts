import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  OnInit,
} from '@angular/core';
import { add, remove } from '../utils/dom';

/**
 * 文本域字数统计
 */
@Directive({
  selector: '[weui-textarea]',
  host: {
    '(input)': '_onChange($event.target?.value)',
  },
})
export class TextareaDirective implements OnInit, OnChanges {
  private fillStr = '';
  private _cn = 1;
  /**
   * 最大长度，0表示不受限
   */
  @Input() maxlength: number = 0;

  /**
   * 中文部分应该算多少个字符，使用 `/[^\x00-\xff]/g` 正则表达式统计中文部分（默认：1个字符）
   */
  @Input('weui-cn')
  set cn(value: number) {
    this._cn = value;
    this.fillStr = new Array(value).fill('*').join('');
  }

  private _value: string;
  private _count: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxlength' in changes) {
      this.init()._onChange(this._value);
    }
  }

  private init() {
    const clsName = `weui-textarea-counter`;
    const pel = this.el.nativeElement.parentElement;
    this.maxlength = +this.maxlength;
    if (this.maxlength <= 0) {
      remove(pel, '.' + clsName);
      this._count = null;
    } else {
      this._count = add(pel, '.' + clsName, 'div', clsName);
    }
    return this;
  }

  _onChange(value: any) {
    if (!this._count) return;

    value = value || '';
    if (this._cn > 1) {
      value = value.replace(/[^\x00-\xff]/g, this.fillStr);
    }
    this._value = value;
    this._count.innerHTML = `${value.length} / ${this.maxlength}`;
  }
}
