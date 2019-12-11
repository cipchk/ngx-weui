import { Component, ViewEncapsulation } from '@angular/core';
import { LoadmoreType } from 'ngx-weui/loadmore';

@Component({
  selector: 'example-loadmore',
  templateUrl: './loadmore.component.html',
  styleUrls: ['./loadmore.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoLoadmoreComponent {
  type: LoadmoreType = 'loading';
  first: boolean = true;

  onChange() {
    this.first = false;
    this.type = 'loading';

    setTimeout(() => {
      this.type = 'line';
    }, 1000);
  }
}
