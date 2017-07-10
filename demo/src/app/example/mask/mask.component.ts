import { Component, ViewChild } from '@angular/core';
import { MaskComponent } from "ngx-weui/mask";

@Component({
    selector: 'example-mask',
    templateUrl: './mask.component.html',
    styleUrls: [ './mask.component.scss' ]
})
export class DemoMaskComponent {

    @ViewChild('mask') mask: MaskComponent;

    onShow(isNormal: boolean = false) {
        this.mask.show().subscribe(() => {
            console.log('已关闭');
        });
        this.mask.backdrop = isNormal;
        if (!isNormal) {
            setTimeout(() => {
                this.mask.hide();
            }, 1000* 2);
        }
    }

}
