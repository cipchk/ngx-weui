import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { PopupComponent } from "ngx-weui/popup";

@Component({
    selector: 'example-popup',
    templateUrl: './popup.component.html',
    styleUrls: [ './popup.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoPopupComponent {

    @ViewChild('simple') simplePopup: PopupComponent;
    @ViewChild('full') fullPopup: PopupComponent;
    @ViewChild('subscribe') subPopup: PopupComponent;

    onSub() {
        this.subPopup.show().subscribe((res: boolean) => {
            alert('click confirm!!!');
        });
    }
}
