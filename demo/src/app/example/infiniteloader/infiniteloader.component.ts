import { Observable } from 'rxjs/Rx';
import { Component, ViewEncapsulation } from '@angular/core';

import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
    selector: 'example-infiniteloader',
    templateUrl: './infiniteloader.component.html',
    styleUrls: ['./infiniteloader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoInfiniteLoaderComponent {

    items: any[] = Array(20).fill(0).map((v: any, i: number) => i);
    onLoadMore(comp: InfiniteLoaderComponent) {
        Observable.timer(1500).subscribe(() => {

            this.items.push(...Array(10).fill(this.items.length).map((v, i) => v + i));

            if (this.items.length >= 50) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }
}
