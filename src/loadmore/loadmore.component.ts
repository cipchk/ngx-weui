import { Component, HostListener, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadmoreConfig } from "./loadmore.config";

@Component({
    selector: '[weui-loadmore],weui-loadmore',
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

    @Input('weui-type') type: 'loading' | 'line' | 'dot' = 'loading';
    @Input('weui-loading-text') loadingText: string = '正在加载';
    @Input('weui-line-text') lineText: string = '暂无数据';

    constructor(DEF: LoadmoreConfig) {
        Object.assign(this, DEF);
    }

}
