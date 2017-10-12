import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationMode } from './pagination.type';
import { PaginationConfig } from './pagination.config';

@Component({
    selector: 'weui-pagination',
    template: `
    <ng-template [ngIf]="mode==='button'">
        <div class="weui-pagination__item weui-pagination__prev">
            <a weui-button (click)="_goto(-1)" weui-plain [weui-mini]="mini" weui-type="default" [disabled]="_prevDisabled" [innerHTML]="prevText"></a>
        </div>
        <div class="weui-pagination__item weui-pagination__num" *ngIf="!simple">{{current}}/{{total}}</div>
        <div class="weui-pagination__item weui-pagination__next">
            <a weui-button (click)="_goto(1)" weui-plain [weui-mini]="mini" weui-type="default" [disabled]="_nextDisabled" [innerHTML]="nextText"></a>
        </div>
    </ng-template>
    <div class="weui-pagination__item weui-pagination__num" *ngIf="mode==='pointer'">
        <div *ngFor="let i of _ptArr" class="weui-pagination__dot" [class.weui-pagination__dot-active]="current === i"><span></span></div>
    </div>
    `,
    host: {
        'class': 'weui-pagination'
    },
    styleUrls: ['./pagination.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnChanges {
    _ptArr: number[] = [];
    /**
     * 形态，可选 `button`,`pointer`
     * @default button
     */
    @Input() mode: PaginationMode;
    /** 当前索引 */
    @Input() current: number = 0;
    /** 数据总数 */
    @Input() total: number = 0;
    /**
     * 是否隐藏数值
     * @default false
     */
    @Input() simple: boolean;
    /**
     * 小号按钮
     * @default true
     */
    @Input() mini: boolean = true;
    /**
     * 上一页文本（支持HTML）
     * @default '上一页'
     */
    @Input() prevText: string;
    /**
     * 下一页文本（支持HTML）
     * @default '下一步'
     */
    @Input() nextText: string;
    /** 分页触发的回调函数 */
    @Output() change = new EventEmitter<number>();

    constructor(cog: PaginationConfig) {
        Object.assign(this, cog);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.mode === 'pointer')
            this._ptArr = Array(this.total).fill(1).map((v, i) => v + i);
        this._checkDisabled();
    }

    _prevDisabled = false;
    _nextDisabled = false;
    _checkDisabled() {
        if (this.mode === 'pointer') return;
        this._prevDisabled = this.current <= 1;
        this._nextDisabled = this.current >= this.total;
    }

    _goto(value: number) {
        if (value === -1 && this._prevDisabled) return false;
        if (value === 1 && this._nextDisabled) return false;

        this.current += value;
        this._checkDisabled();
        this.change.emit(this.current);
    }
}
