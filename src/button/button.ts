import { Component, Directive, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { ButtonConfig } from './button.config';
import { ButtonType } from "../utils/types";

@Directive({
    selector: '[weui-button]',
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
        '[disabled]': 'disabled'
    }
})
export class ButtonDirective {
    
    /**
     * 置灰态
     * 
     * @type {boolean}
     * @default false
     */
    @Input('weui-disabled') disabled: boolean = false;

    /**
     * 加载状态
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_loading') 
    @Input('weui-loading') loading: boolean = false;

    /**
     * 是否小号
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_mini') 
    @Input('weui-mini') mini: boolean = false;

    /**
     * 镂空按钮
     * 
     * @type {boolean}
     * @default false
     */
    @Input('weui-plain') plain: boolean = false;

    /**
     * 操作场景：确定、取消、警示
     * 
     * @type {ButtonType}
     * @default primary
     */
    @Input('weui-type') type: ButtonType = 'primary';

    constructor(_config: ButtonConfig) {
        Object.assign(this, _config);
    }
}
