import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';

import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
  selector: 'example-infiniteloader',
  templateUrl: './infiniteloader.component.html',
  styleUrls: ['./infiniteloader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoInfiniteLoaderComponent {
  @ViewChild(InfiniteLoaderComponent, { static: true }) il: InfiniteLoaderComponent;
  restartBtn = false;

  items: any[] = Array(20)
    .fill(0)
    .map((_v: any, i: number) => i);
  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    timer(1500).subscribe(() => {
      this.items.push(
        ...Array(10)
          .fill(this.items.length)
          .map((v, i) => v + i),
      );

      if (this.items.length >= 50) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

  restart() {
    this.items.length = 0;
    this.il.restart();
  }
}
