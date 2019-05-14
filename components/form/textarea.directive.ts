import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { add, remove, InputNumber } from 'ngx-weui/core';

/**
 * 文本域字数统计
 */
@Directive({
  selector: '[weui-textarea]',
  exportAs: 'weuiTextarea',
  host: {
    '(input)': '_onChange($event.target?.value)',
  },
})
export class TextareaDirective implements OnInit {
  private fillStr = '';
  private _cn = 1;
  private _value: string;
  private _count: any;

  /**
   * 最大长度，0表示不受限
   */
  private _maxlength = 0;
  @Input()
  @InputNumber()
  set maxlength(val: number) {
    this._maxlength = val;
    this.init()._onChange(this._value);
  }
  get maxlength(): number {
    return this._maxlength;
  }

  /**
   * 中文部分应该算多少个字符，使用 `/[^\x00-\xff]/g` 正则表达式统计中文部分（默认：1个字符）
   */
  @Input('weui-cn')
  set cn(value: number) {
    this._cn = value;
    this.fillStr = new Array(+value).fill('*').join('');
  }

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.init();
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

  _onChange(value: string) {
    if (!this._count) return;

    value = value || '';
    if (this._cn > 1) {
      value = value.replace(/[^\x00-\xff]/g, this.fillStr);
    }
    this._value = value;
    this._count.innerHTML = `${value.length} / ${this.maxlength}`;
  }
}
