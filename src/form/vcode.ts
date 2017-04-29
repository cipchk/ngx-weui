import { Directive, Input, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';
import { findParent, add, remove } from './../utils/dom';

@Directive({
    selector: '[weui-vcode]',
    host: {
        '(click)': 'onClick()',
        '[disabled]': 'disabled'
    }
})
export class VCodeDirective implements OnDestroy {

    @Input('weui-vcode') onSend: Function;
    @Input('weui-seconds') seconds: number = 60;
    @Input('weui-tpl') tpl: string = '${num} 秒';
    @Input('weui-error') error: string = '重新发送';

    disabled: boolean = false;
    private _cur: string;
    private _t: any;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (!this.onSend) throw new Error('weui-vcode必须传递一个返回值为 `Observable<any>` 函数');
        this._cur = this.el.nativeElement.innerHTML;
    }

    onClick() {
        this.disabled = true;
        (<Observable<boolean>>this.onSend()).subscribe((res) => {
            res ? this.tick() : this.err();
        })
    }

    private err(): void {
        this.disabled = false;
        this.el.nativeElement.innerHTML = this.error;
    }

    private tick(): void {
        let count = this.seconds < 1 ? 1 : this.seconds;
        this.setText(count);
        this._t = setInterval(() => {
            if (--count <= 0) {
                this.disabled = false;
                this.el.nativeElement.innerHTML = this._cur;
                this.destroy();
            } else
                this.setText(count);
        }, 1000);
    }

    private setText(num: number): void {
        this.el.nativeElement.innerHTML = this.tpl.replace(/\${num}/, num.toString());
    }

    private destroy() {
        if (this._t) {
            clearInterval(this._t);
            this._t = null;
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
