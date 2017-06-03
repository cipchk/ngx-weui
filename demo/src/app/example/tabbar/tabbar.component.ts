import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

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

            this.items.push(this.items.length);

            if (this.items.length > 22) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }
} 
