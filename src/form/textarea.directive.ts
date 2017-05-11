import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { add, remove } from './../utils/dom';

/**
 * 文本域字数统计
 * @example 
 *  <textarea weui-textarea weui-cn="2" maxlength="20"></textarea>
 */
@Directive({
    selector: '[weui-textarea]',
    host: {
        '(ngModelChange)': 'onChange($event)'
    }
})
export class TextareaDirective implements OnChanges {

    /**
     * 最大长度
     * 
     * @type {number}
     */
    @Input() maxlength: number = 0;

    /**
     * 中文部分应该算多少个字符，使用【/[^\x00-\xff]/g】正则表达式统计中文部分（默认：1个字符）
     * 
     * @type {number}
     * @default 1
     */
    @Input('weui-cn') cn: number = 1;

    private _value: string;
    private _count: any;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (this.maxlength !== undefined)
            this.init();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('maxlength' in changes) {
            this.init().onChange(this._value);
        }
    }

    private init() {
        let clsName = `weui-textarea-counter`;
        let pel = this.el.nativeElement.parentElement;
        if (this.maxlength <= 0) {
            remove(pel, '.' + clsName);
            this._count = null;
        } else {
            this._count = add(pel, '.' + clsName, 'div', clsName);
        }
        return this;
    }

    onChange(value: any) {
        if (!this._count) return;
        
        value = value || '';
        if (this.cn > 1) {
            value = value.replace(/[^\x00-\xff]/g, '**');
        }
        this._value = value;
        this._count.innerHTML = `${value.length} / ${this.maxlength}`;
    }
}
