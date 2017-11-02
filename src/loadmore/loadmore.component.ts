import { Component, HostListener, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadmoreConfig } from './loadmore.config';

@Component({
    selector: 'weui-loadmore',
    template: `
        <div class="weui-loadmore" [ngClass]="{
            'weui-loadmore_line': type!=='loading',
            'weui-loadmore_dot': type==='dot'
        }">
            <i class="weui-loading" *ngIf="type==='loading'"></i>
            <span class="weui-loadmore__tips">{{type==='dot'?'':type==='line'?lineText:loadingText}}</span>
        </div>
    `
})
export class LoadmoreComponent {

    /**
     * 类型
     *
     * @type {('loading' | 'line' | 'dot')}
     */
    @Input() type: 'loading' | 'line' | 'dot' = 'loading';

    /**
     * 当type=='loading'时显示的文本
     *
     * @type {string}
     */
    @Input() loadingText: string = '正在加载';

    /**
     * 当type=='line'时显示的文本
     *
     * @type {string}
     */
    @Input() lineText: string = '暂无数据';

    constructor(DEF: LoadmoreConfig) {
        Object.assign(this, DEF);
    }

}
