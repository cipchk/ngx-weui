import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { ToastComponent, ToastService } from "ngx-weui/toast";

@Component({
    selector: 'example-toast',
    templateUrl: './toast.component.html',
    styleUrls: [ './toast.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoToastComponent {

    @ViewChild('success') successToast: ToastComponent;
    @ViewChild('loading') loadingToast: ToastComponent;
    constructor(private srv: ToastService) { }

    onShow(type: 'success' | 'loading') {
        (<ToastComponent>this[`${type}Toast`]).onShow();
    }

    onShowBySrv(type: 'success' | 'loading', forceHide: boolean = false) {
        this.srv[type]();
        if (forceHide === true) {
            setTimeout(() => {
                this.srv.hide();
            }, 1000)
        }
    }

}
