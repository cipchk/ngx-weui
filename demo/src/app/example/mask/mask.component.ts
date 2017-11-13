import { Component, ViewChild } from '@angular/core';
import { MaskComponent } from 'ngx-weui/mask';

@Component({
    selector: 'example-mask',
    templateUrl: './mask.component.html',
    styleUrls: [ './mask.component.scss' ]
})
export class DemoMaskComponent {

    loading = false;

    @ViewChild('mask') mask: MaskComponent;

    @ViewChild('maskContent') maskContent: MaskComponent;

    onShow(isNormal: boolean = false) {
        this.mask.show().subscribe(() => {
            console.log('已关闭');
        });
        this.mask.backdrop = isNormal;
        if (!isNormal) {
            setTimeout(() => {
                this.mask.hide();
            }, 1000 * 2);
        }
    }

    onShowLoading() {
        this.mask.show();
        this.loading = true;
        setTimeout(() => {
            this.mask.hide();
        }, 1000 * 2);
    }

    showContent() {
        this.maskContent.show();
        setTimeout(() => {
            this.maskContent.hide();
        }, 1000 * 2);
    }

}
