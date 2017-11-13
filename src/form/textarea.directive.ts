import { Directive, Input, OnChanges, SimpleChanges, ElementRef, OnInit } from '@angular/core';
import { add, remove } from './../utils/dom';

/**
 * 文本域字数统计
 */
@Directive({
    selector: '[weui-textarea]',
    host: {
        '(ngModelChange)': '_onChange($event)'
    }
})
export class TextareaDirective implements OnInit, OnChanges {

    /**
     * 最大长度，0表示不受限
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
        if (this.cn > 1) {
            value = value.replace(/[^\x00-\xff]/g, '**');
        }
        this._value = value;
        this._count.innerHTML = `${value.length} / ${this.maxlength}`;
    }
}
