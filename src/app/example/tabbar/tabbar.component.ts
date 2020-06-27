import { Component, ViewEncapsulation } from '@angular/core';
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
import { timer } from 'rxjs';

@Component({
  selector: 'example-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoTabbarComponent {
  time: number;
  icon = `<img src=./assets/images/icon_tabbar.png>`;
  activeIcon = `<img src=./assets/images/momentloader.png>`;

  onSelect(): void {
    this.time = new Date().getTime();
  }

  items: any[] = Array(20)
    .fill(0)
    .map((_v: any, i: number) => i);

  onLoadMore(comp: InfiniteLoaderComponent): void {
    timer(1500).subscribe(() => {
      this.items.push(
        ...Array(10)
          .fill(this.items.length)
          .map((v, i) => v + i),
      );

      if (this.items.length >= 50) {
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }
}
