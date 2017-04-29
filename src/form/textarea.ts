import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { add, remove } from './../utils/dom';

@Directive({
    selector: '[weui-textarea]',
    host: {
        '(ngModelChange)': 'onChange($event)'
    }
})
export class TextareaDirective implements OnChanges {

    @Input() maxlength: number = 0;
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
