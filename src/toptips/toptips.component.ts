import { Component, Input, EventEmitter, Output, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

export type ToptipsType = 'default' | 'warn' | 'info' | 'primary' | 'success';

@Component({
    selector: 'weui-toptips',
    template: `
    <div class="weui-toptips" style="display:block" [ngClass]="_classMap">{{text}}<ng-content></ng-content></div>`,
    host: {
        '[hidden]': '!_showd'
    },
    styleUrls: [ './toptips.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ToptipsComponent implements OnInit, OnDestroy {

    /**
     * 文本
     *
     * @type {string}
     */
    @Input() text: string;
    /**
     * 显示时长后自动关闭（单位：ms）
     *
     * @type {number}
     * @default 2000
     */
    @Input() time: number = 2000;
    /**
     * 隐藏后回调
     */
    @Output() hide = new EventEmitter();

    _type: ToptipsType;
    /**
     * 类型
     * @type { ToptipsType }
     */
    @Input() set type(_type: ToptipsType) {
        this._type = _type;
        this.setClassMap();
    }

    ngOnInit() {
        this.setClassMap();
    }

    _classMap: any = {};
    private setClassMap(): void {
        this._classMap = {
            [`weui-toptips_${this._type}`]: true
        };
    }

    _showd: boolean = false;
    private timer: any;
    /**
     * @docs-private
     */
    onShow() {
        this.destroy();

        this._showd = true;
        this.timer = setTimeout(() => {
            this.onHide();
        }, this.time);
        return this;
    }

    /**
     * @docs-private
     */
    onHide() {
        this._showd = false;
        this.hide.emit();
    }

    private destroy() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
