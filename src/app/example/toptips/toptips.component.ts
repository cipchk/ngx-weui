import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { ToptipsComponent, ToptipsService, ToptipsType } from 'ngx-weui/toptips';

@Component({
  selector: 'example-toptips',
  templateUrl: './toptips.component.html',
  styleUrls: ['./toptips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoToptipsComponent {
  @ViewChild('toptips', { static: true }) toptips: ToptipsComponent;
  text = '';
  type: ToptipsType;
  constructor(private srv: ToptipsService) {}

  onShow(type: ToptipsType) {
    this.type = type;
    switch (type) {
      case 'warn':
        this.text = ' Oops, something is wrong! ';
        break;
      case 'primary':
        this.text = ' Success submited! ';
        break;
      case 'info':
        this.text = ' Thanks for coming! ';
        break;
    }
    this.toptips.onShow();
  }

  onShowBySrv(type: 'warn' | 'info' | 'primary' | 'success' | 'default') {
    this.srv[type]('这是一段文字');
  }
}
