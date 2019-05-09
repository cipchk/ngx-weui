import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'weui-button-icon, [weui-button-icon]',
  exportAs: 'weuiButtonIcon',
  host: {
    '[class.weui-btn_cell__icon]': 'true',
  },
  template: '<ng-content></ng-content>',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonIconComponent {}
