import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { ToptipsComponent, ToptipsService } from "ngx-weui/toptips";

@Component({
    selector: 'example-toptips',
    templateUrl: './toptips.component.html',
    styleUrls: [ './toptips.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoToptipsComponent {

    @ViewChild('toptips') toptips: ToptipsComponent;
    constructor(private srv: ToptipsService) { }

    onShow(type: 'warn' | 'info' | 'primary') {
        this.toptips.type = type;
        switch (type) {
            case 'warn':
                this.toptips.text = ' Oops, something is wrong! ';
                break;
            case 'primary':
                this.toptips.text = ' Success submited! ';
                break;
            case 'info':
                this.toptips.text = ' Thanks for coming! ';
                break;
        }
        this.toptips.onShow();
    }

    onShowBySrv(type: 'warn' | 'info' | 'primary' | 'success' | 'default') {
        this.srv[type]('这是一段文字');
    }

}
