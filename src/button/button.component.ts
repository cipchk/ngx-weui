import { Component, Directive, EventEmitter, Input, OnInit, Output, HostBinding, ViewEncapsulation } from '@angular/core';
import { ButtonConfig } from './button.config';
import { ButtonType } from "../utils/types";
import { toBoolean } from '../utils/boolean-property';

/**
 * 按钮
 * @example
 * <weui-button>Button</weui-button>
 * <button weui-button>Button</button>
 * <a href="#" weui-button>Button</a>
 * <button weui-button [weui-type]="'warn'" disabled weui-loading></button>
 */
@Component({
    selector: 'weui-button, button[weui-button], a[weui-button]',
    host: {
        'class': 'weui-btn',
        '[class.weui-btn_primary]': '!plain && type==="primary"',
        '[class.weui-btn_default]': '!plain && type==="default"',
        '[class.weui-btn_warn]': '!plain && type==="warn"',
        '[class.weui-btn_plain-primary]': 'plain && type==="primary"',
        '[class.weui-btn_plain-default]': 'plain && type==="default"',
        '[class.weui-btn_plain-warn]': 'plain && type==="warn"',
        '[class.weui-btn_disabled]': '!plain && disabled',
        '[class.weui-btn_plain-disabled]': 'plain && disabled',
        '[attr.disabled]': 'disabled ? "disabled" : null'
    },
    exportAs: 'weuiButton',
    template: '<i class="weui-loading" *ngIf="loading"></i><ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {

    /**
     * 操作场景：primary、default、warn
     * 
     * @type {ButtonType}
     * @default primary
     */
    @Input('weui-type') type: ButtonType = 'primary';

    /**
     * 是否加载状态
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_loading') 
    @Input('weui-loading')
    get loading(): boolean { return this._loading; }
    set loading(value) { this._loading = toBoolean(value); }
    private _loading: boolean = false;

    /**
     * 是否小号
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_mini') 
    @Input('weui-mini')
    get mini(): boolean { return this._mini; }
    set mini(value) { this._mini = toBoolean(value); }
    private _mini: boolean = false;

    /**
     * 镂空按钮
     * 
     * @type {boolean}
     * @default false
     */
    @Input('weui-plain')
    get plain(): boolean { return this._plain; }
    set plain(value) { this._plain = toBoolean(value); }
    private _plain: boolean = false;
    
    /**
     * disabled状态
     * 
     * @type {boolean}
     * @default false
     */
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) { this._disabled = toBoolean(value); }
    private _disabled: boolean = false;

    constructor(_config: ButtonConfig) {
        Object.assign(this, _config);
    }
}
