import { Component, ViewEncapsulation } from '@angular/core';
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'example-tabbar',
    templateUrl: './tabbar.component.html',
    styleUrls: ['./tabbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoTabbarComponent {
    time: number;
    onSelect() {
        this.time = new Date().getTime();
    }

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
