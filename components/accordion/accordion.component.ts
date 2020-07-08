import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'weui-accordion-panel',
  exportAs: 'weuiAccordionPanel',
  template: ``,
  host: {},
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionPanelComponent {}

@Component({
  selector: 'weui-accordion',
  exportAs: 'weuiAccordion',
  template: ` <ng-content></ng-content> `,
  host: {},
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent {}
