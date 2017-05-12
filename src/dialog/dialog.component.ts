import { Component, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { isAndroid } from '../utils/browser';
import { DialogConfig } from './dialog.config';

@Component({
    selector: 'weui-dialog',
    template: `
        <div class="weui-mask" (click)="hide(true)"></div>
        <div class="weui-dialog" [ngClass]="{'weui-skin_android': config.skin === 'android'}">
            <div class="weui-dialog__hd" *ngIf="config.title"><strong class="weui-dialog__title">{{config.title}}</strong></div>
            <div class="weui-dialog__bd" *ngIf="config.content">{{config.content}}</div>
            <div class="weui-dialog__ft">
                <a href="#" *ngFor="let item of config.btns" 
                    class="weui-dialog__btn weui-dialog__btn_{{item.type}}"
                    (click)="_onSelect(item)">{{item.text}}</a>
            </div>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1, display: 'block' })),
        state('hide', style({ opacity: 0, display: 'none' })),
        transition('hide <=> show', [animate(200)])
    ])]
})
export class DialogComponent implements OnDestroy {

    /**
     * 对话框配置项
     * 
     * @type {DialogConfig}
     */
    @Input() config: DialogConfig;

    /**
     * 关闭回调
     */
    @Output() close = new EventEmitter();

    private observer: Observer<any>;

    private shown: boolean = false;

    @HostBinding('@visibility') get _visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    constructor(private DEF: DialogConfig) { }

    /**
     * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
     * 
     * @returns {Observable<any>}
     */
    show(): Observable<any> {
        this.config = Object.assign({
            backdrop: false
        }, this.DEF, this.config);
        if (this.config.skin === 'auto') {
            this.config.skin = isAndroid() ? 'android' : 'ios';
        }
        // 重组btns
        if (!this.config.btns) {
            this.config.btns = [];
            if (this.config.cancel) {
                this.config.btns.push({ text: this.config.cancel, type: this.config.cancelType, value: false });
            }
            if (this.config.confirm) {
                this.config.btns.push({ text: this.config.confirm, type: this.config.confirmType, value: true });
            }
        }

        this.shown = true;
        return Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        });
    }

    /**
     * 隐藏
     * 
     * @param {boolean} [is_backdrop] 是否从背景上点击
     */
    hide(is_backdrop?: boolean) {
        if (is_backdrop === true && this.config.backdrop === false) return false;

        this.shown = false;
        this.close.emit();
    }

    _onSelect(menu: any) {
        this.observer.next(menu);
        this.observer.complete();
        this.hide();
        return false;
    }

    ngOnDestroy(): void {
        if (this.observer && this.observer instanceof Subscription) {
            (<Subscription>this.observer).unsubscribe();
        }
    }

}
