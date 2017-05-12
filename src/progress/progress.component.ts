import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'weui-progress',
    template: `
        <div class="weui-progress">
            <div class="weui-progress__bar">
                <div class="weui-progress__inner-bar" [style.width]="_value + '%'"></div>
            </div>
            <a href="#" class="weui-progress__opr" *ngIf="canCancel" (click)="_onCancel()">
                <i class="weui-icon-cancel"></i>
            </a>
        </div>
    `
})
export class ProgressComponent {

    _value: number = 0;
    /**
     * 默认进度值，取值范围：0-100（单位：%）
     * 
     * @type {number}
     */
    @Input() set value(d: number) {
        if (d < 0 || d > 100) throw new Error('默认进度值取消范围必须是0-100');
        this._value = d;
    }

    /**
     * 是否允许取消
     * 
     * @type {boolean}
     */
    @Input() canCancel: boolean = true;

    /**
     * 取消回调
     */
    @Output() cancel = new EventEmitter();

    _onCancel() {
        if (this.canCancel) this.cancel.emit();
        return false;
    }
}
