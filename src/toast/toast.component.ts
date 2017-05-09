import { Component, HostBinding, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastConfig } from './toast.config';

@Component({
    selector: 'weui-toast,[weui-toast]',
    template: `
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="{{icon}} weui-icon_toast"></i>
            <p class="weui-toast__content">{{text}}</p>
        </div>
    `,
    host: {
        '[hidden]': '!showd'
    }
})
export class ToastComponent implements OnDestroy {

    @Input() set type(_t: 'success' | 'loading') {
        Object.assign(this, this.DEF[_t]);
    }

    @Input() text: string;
    @Input() icon: string;
    @Input() time: number = 2000;
    @Output() hide = new EventEmitter();

    showd: boolean = false;

    constructor(private DEF: ToastConfig) {
        this.type = 'success';
    }

    private timer: any;
    onShow() {
        this.showd = true;
        this.timer = setTimeout(() => {
            this.onHide();
        }, this.time);
        return this;
    }

    onHide() {
        this.showd = false;
        this.hide.emit();
    }

    ngOnDestroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
