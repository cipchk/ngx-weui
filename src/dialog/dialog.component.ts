import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { isAndroid } from '../utils/browser';
import { DialogConfig } from './dialog.config';

@Component({
    selector: 'weui-dialog',
    template: `
        <div class="weui-mask" [ngClass]="{'weui-mask__in': _shown}" (click)="hide(true)"></div>
        <div class="weui-dialog" [ngClass]="{'weui-dialog__in': _shown, 'weui-skin_android': config.skin === 'android'}">
            <div class="weui-dialog__hd" *ngIf="config.title"><strong class="weui-dialog__title">{{config.title}}</strong></div>
            <div class="weui-dialog__bd" *ngIf="config.content" [innerHTML]="config.content"></div>
            <div class="weui-dialog__ft">
                <a href="#" *ngFor="let item of config.btns"
                    class="weui-dialog__btn weui-dialog__btn_{{item.type}}"
                    (click)="_onSelect(item)">{{item.text}}</a>
            </div>
        </div>
    `,
    styles: [
        `
        .weui-mask,
        .weui-dialog {
            opacity: 0;
            visibility: hidden;
        }
        .weui-mask__in,
        .weui-dialog__in {
            opacity: 1;
            visibility: visible;
        }
        .weui-mask {
            transition-duration: .3s;
        }
        .weui-dialog {
            transition-duration: .2s;
            transform-origin: 0 0;
        }
        .weui-dialog__in {
            transform: scale(1) translate(-50%, -50%);
        }
        `
    ]
})
export class DialogComponent implements OnDestroy {

    private _config: DialogConfig;
    /**
     * 对话框配置项
     *
     * @type {DialogConfig}
     */
    @Input()
    set config(value: DialogConfig) {
        let config = Object.assign({
            backdrop: false
        }, this.DEF, value);
        if (config.skin === 'auto') {
            config.skin = isAndroid() ? 'android' : 'ios';
        }
        // 重组btns
        if (!config.btns) {
            config.btns = [];
            if (config.cancel) {
                config.btns.push({ text: config.cancel, type: config.cancelType, value: false });
            }
            if (config.confirm) {
                config.btns.push({ text: config.confirm, type: config.confirmType, value: true });
            }
        }
        this._config = config;
    }

    get config(): DialogConfig {
        return this._config;
    }

    /**
     * 打开动画结束后回调（唯一参数：对话框实例对象）
     */
    @Output() open = new EventEmitter<DialogComponent>();

    /**
     * 关闭动画开始时回调（唯一参数：对话框实例对象）
     */
    @Output() close = new EventEmitter<DialogComponent>();

    private observer: Observer<any>;

    _shown: boolean = false;

    constructor(private DEF: DialogConfig) { }

    /**
     * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
     *
     * @returns {Observable<any>}
     */
    show(): Observable<any> {
        this._shown = true;
        // 模拟动画结束后回调
        setTimeout(() => {
            this.open.emit(this);
        }, 300);
        return Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        });
    }

    /**
     * 隐藏
     *
     * @param {boolean} [is_backdrop] 是否从背景上点击
     */
    hide(is_backdrop: boolean = false) {
        if (is_backdrop === true && this.config.backdrop === false) return false;

        this._shown = false;
        this.close.emit(this);
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
