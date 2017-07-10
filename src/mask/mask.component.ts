import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'weui-mask',
    template: `<div class="weui-mask" [ngClass]="{'weui-mask--visible': _shown }" (click)="hide(true)"></div>`,
    styles: [
        `
        .weui-mask {
            opacity: 0;
            visibility: hidden;
            transition-duration: .3s;
        }
        .weui-mask--visible {
            opacity: 1;
            visibility: visible;
        }
        `
    ]
})
export class MaskComponent implements OnDestroy {
    /**
     * 点击是否允许关闭（默认：false）
     *
     * @type {boolean}
     */
    @Input() backdrop: boolean = false;

    /**
     * 关闭回调
     */
    @Output() close = new EventEmitter();

    private observer: Observer<void>;
    _shown: boolean = false;

    /**
     * 显示，并返回一个Observable
     */
    show(): Observable<void> {
        setTimeout(() => {
            this._shown = true;
        });
        return Observable.create((observer: Observer<void>) => {
            this.observer = observer;
        });
    }

    /**
     * 隐藏
     *
     * @param {boolean} [is_backdrop=false] 是否手动点击关闭（默认：false）
     */
    hide(is_backdrop: boolean = false) {
        if (is_backdrop === true && this.backdrop === false) return false;

        this._shown = false;
        this.close.emit();
        setTimeout(() => {
        }, 300);
    }

    ngOnDestroy(): void {
        if (this.observer && this.observer instanceof Subscription) {
            (<Subscription>this.observer).unsubscribe();
        }
    }

}
