import { Component, Input } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionConfig } from "./accordion.config";
import { AnimateType } from "../utils/types";

@Component({
    selector: 'weui-accordion',
    template: `<ng-content></ng-content>`,
    host: {
        '[attr.aria-multiselectable]': 'closeOthers',
        'style': 'display: block'
    }
})
export class AccordionComponent {
    /**
     * 是否可折叠，`true` 表示同时所有都允许展开，`false` 表示同时只允许一个展开
     * 
     * @type {boolean}
     * @default false
     */
    @Input() collapsible: boolean = false;
    /**
     * 自动展开第一次
     * 
     * @type {boolean}
     * @default true
     */
    @Input() activeFirst: boolean = true;
    /**
     * 动画类型，`none` 无动画，`slide` 滑动
     * 
     * @type {AnimateType}
     */
    @Input() _animate: AnimateType = 'slide';

    private panels: AccordionPanelComponent[] = [];

    constructor(config: AccordionConfig) {
        Object.assign(this, config);
    }

    _add(item: AccordionPanelComponent) {
        this.panels.push(item);
        if (this.panels.length === 1 && this.activeFirst)
            item.active = true;
    }

    _remove(item: AccordionPanelComponent) {
        const idx = this.panels.indexOf(item);
        if (idx !== -1) this.panels.splice(idx, 1);
    }

    _closeOthers(cur: AccordionPanelComponent) {
        if (this.collapsible) return;

        this.panels.forEach(panel => {
            if (!panel.disabled && panel !== cur) panel.active = false;
        });
    }
}
