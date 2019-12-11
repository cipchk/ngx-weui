import { Component, ViewEncapsulation } from '@angular/core';
import { ModeType, PositionType } from 'ngx-weui/sidebar';

@Component({
  selector: 'example-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoSidebarComponent {
  _status: boolean = false;
  mode: ModeType = 'slide';
  position: PositionType = 'left';
  backdrop: boolean = true;

  toggleOpened(): void {
    this._status = !this._status;
  }

  openStart() {
    console.log('openStart');
  }

  opened() {
    console.log('opened');
  }

  closeStart() {
    console.log('closeStart');
  }

  closed() {
    console.log('closed');
  }
}
