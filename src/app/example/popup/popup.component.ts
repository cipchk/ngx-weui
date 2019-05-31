import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { PopupComponent } from 'ngx-weui/popup';

@Component({
  selector: 'example-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoPopupComponent {
  @ViewChild('simple', { static: true }) simplePopup: PopupComponent;
  @ViewChild('full', { static: true }) fullPopup: PopupComponent;
  @ViewChild('subscribe', { static: true }) subPopup: PopupComponent;

  onSub() {
    this.subPopup.show().subscribe(() => {
      alert('click confirm!!!');
    });
  }
}
