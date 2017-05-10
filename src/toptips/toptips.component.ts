import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

export type ToptipsType = 'default' | 'warn' | 'info' | 'primary' | 'success';

@Component({
    selector: 'weui-toptips,[toptips]',
    template: `
    <div class="weui-toptips" style="display:block" [ngClass]="classMap">{{text}}<ng-content></ng-content></div>`,
    styles: [
        `.weui-toptips_default{ background-color: #B2B2B2; } .weui-toptips_info{ background-color: #586C94; } .weui-toptips_primary{ background-color: #1AAD19; }`
    ],
    host: {
        '[hidden]': '!showd'
    },
    encapsulation: ViewEncapsulation.None
})
export class ToptipsComponent {

    @Input() text: string;
    @Input() time: number = 2000;
    @Output() hide = new EventEmitter();

    _type: ToptipsType;
    @Input() set type(_type: ToptipsType) {
        this._type = _type;
        this.setClassMap();
    }

    ngOnInit() {
        this.setClassMap();
    }

    classMap: any = {};
    private setClassMap(): void {
        this.classMap = {
            [`weui-toptips_${this._type}`]: true
        };
    }
    
    showd: boolean = false;
    private timer: any;
    onShow() {
        this.destroy();
        
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

    private destroy() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
