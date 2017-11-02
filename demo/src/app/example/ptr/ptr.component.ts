import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';

import { PTRComponent } from 'ngx-weui/ptr';

@Component({
    selector: 'example-ptr',
    templateUrl: './ptr.component.html',
    styleUrls: ['./ptr.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoPTRComponent {

    disabled: boolean = false;
    items: any[] = [];
    onRefresh(ptr: PTRComponent) {
        Observable.timer(800).subscribe(() => {
            this.genData();
            ptr.setFinished('上次刷新：' + new Date().getTime());
        });
    }

    ngOnInit() {
        this.genData();
    }

    private genData() {
        this.items = Array(6).fill({}).map((v: any, idx: number) => {
            return `${idx}:${Math.random()}`;
        });
    }

}
