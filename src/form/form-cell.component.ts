import { Component, Input, HostBinding } from '@angular/core';
@Component({
    selector: 'FormCell,[FormCell]',
    
    template: `
        <label [ngClass]="classMap" *ngIf="radio || checkbox; else elseBlock">
        <ng-template #elseBlock><div [ngClass]="classMap"></ng-template>
        <ng-content></ng-content>
        </label *ngIf="radio || checkbox; else elseBlock2">
        <ng-template #elseBlock2></div></ng-template>
    `
})
export class FormCellComponent {

    classMap: any = {};

    /**
     * 验证码
     * 
     * @type {boolean}
     */
    @Input() vcode: boolean = false;

    /**
     * 警告
     * 
     * @type {boolean}
     */
    @Input() warn: boolean = false;

    /**
     * 单选
     * 
     * @type {boolean}
     */
    @Input() radio: boolean = false;

    /**
     * 多选
     * 
     * @type {boolean}
     */
    @Input() checkbox: boolean = false;

    /**
     * 开头
     * 
     * @type {boolean}
     */
    @Input() switch: boolean = false;

    /**
     * 下拉
     * 
     * @type {boolean}
     */
    @Input() select: boolean = false;

    /**
     * 下拉位置
     * 
     * @type {('before' | 'after')}
     */
    @Input() selectPos: 'before' | 'after';

    setClassMap() {
        this.classMap = {
            'weui-cell': true,
            'weui-cell_vcode': this.vcode,
            'weui-cell_warn': this.warn,
            'weui-cell_switch': this.switch,
            'weui-cell_select': this.select
        };
        if (this.radio || this.checkbox) {
            this.classMap['weui-check__label'] = true;
        }
        if (this.selectPos === 'before') {
            this.classMap['weui-cell_select-before'] = true;
        }
        if (this.selectPos === 'after') {
            this.classMap['weui-cell_select-after'] = true;
        }
    }

    constructor() {
        this.setClassMap();
    }
}
