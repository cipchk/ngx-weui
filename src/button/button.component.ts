import { Component, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { ButtonConfig } from './button.config';

@Component({
    selector: 'Button,[Button]',
    template: `
        <i class="weui-loading" *ngIf="loading"></i><ng-content></ng-content>
    `,
    host: {
        'class': 'weui-btn',
        '[class.weui-btn_primary]': '!plain && type==="primary"',
        '[class.weui-btn_default]': '!plain && type==="default"',
        '[class.weui-btn_warn]': '!plain && type==="warn"',
        '[class.weui-btn_plain-primary]': 'plain && type==="primary"',
        '[class.weui-btn_plain-default]': 'plain && type==="default"',
        '[class.weui-btn_plain-warn]': 'plain && type==="warn"',
        '[class.weui-btn_disabled]': '!plain && disabled',
        '[class.weui-btn_plain-disabled]': 'plain && disabled'
    }
})
export class ButtonComponent {
    
    /**
     * 置灰态
     * 
     * @type {boolean}
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * 加载状态
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_loading') @Input() loading: boolean = false;

    /**
     * 是否小号
     * 
     * @type {boolean}
     * @default false
     */
    @HostBinding('class.weui-btn_mini') @Input() mini: boolean = false;

    /**
     * 镂空按钮
     * 
     * @type {boolean}
     * @default false
     */
    @Input() plain: boolean = false;

    /**
     * 操作场景：确定、取消、警示
     * 
     * @type {('default' | 'primary' | 'warn')}
     * @default primary
     */
    @Input() type: 'default' | 'primary' | 'warn' = 'primary';

    constructor(_config: ButtonConfig) {
        Object.assign(this, _config);
    }
}
